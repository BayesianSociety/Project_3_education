import { FRAGMENT_SHADER, VERTEX_SHADER } from './shaders';

type TextureResource = {
  image: HTMLImageElement;
  texture?: WebGLTexture;
  width: number;
  height: number;
};

export type Sprite = {
  id: string;
  asset: string;
  x: number;
  y: number;
  width: number;
  height: number;
  flip?: boolean;
};

export type RenderPayload = {
  background: string;
  sprites: Sprite[];
};

export class CandyRenderer {
  private canvas: HTMLCanvasElement;
  private gl: WebGLRenderingContext | null = null;
  private program: WebGLProgram | null = null;
  private positionBuffer: WebGLBuffer | null = null;
  private texcoordBuffer: WebGLBuffer | null = null;
  private ctx2d: CanvasRenderingContext2D | null = null;
  private textures = new Map<string, TextureResource>();

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.gl = canvas.getContext('webgl');
    if (this.gl) {
      this.initWebGL();
    } else {
      this.ctx2d = canvas.getContext('2d');
    }
  }

  private initWebGL() {
    if (!this.gl) return;
    const gl = this.gl;
    const program = gl.createProgram();
    const vertex = this.compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragment = this.compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!program || !vertex || !fragment) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('Failed to link WebGL program', gl.getProgramInfoLog(program));
      return;
    }
    this.program = program;
    this.positionBuffer = gl.createBuffer();
    this.texcoordBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        0, 0, //
        1, 0, //
        0, 1, //
        0, 1, //
        1, 0, //
        1, 1, //
      ]),
      gl.STATIC_DRAW
    );

    gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        0, 0, //
        1, 0, //
        0, 1, //
        0, 1, //
        1, 0, //
        1, 1, //
      ]),
      gl.STATIC_DRAW
    );
  }

  private compileShader(type: number, source: string) {
    if (!this.gl) return null;
    const shader = this.gl.createShader(type);
    if (!shader) return null;
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.warn('Failed to compile shader', this.gl.getShaderInfoLog(shader));
      return null;
    }
    return shader;
  }

  async prepareAssets(assets: string[]) {
    await Promise.all(assets.map((asset) => this.loadAsset(asset)));
  }

  private async loadAsset(asset: string) {
    if (this.textures.has(asset)) return;
    const image = await loadImage(asset);
    const info: TextureResource = { image, width: image.width, height: image.height };
    if (this.gl) {
      const texture = this.gl.createTexture();
      if (texture) {
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
        info.texture = texture;
      }
    }
    this.textures.set(asset, info);
  }

  render(payload: RenderPayload) {
    if (this.gl && this.program) {
      this.renderWebGL(payload);
    } else if (this.ctx2d) {
      this.renderCanvas(payload);
    }
  }

  private renderWebGL(payload: RenderPayload) {
    if (!this.gl || !this.program || !this.positionBuffer || !this.texcoordBuffer) return;
    const gl = this.gl;
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.clearColor(0.07, 0.02, 0.18, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(this.program);

    const positionLocation = gl.getAttribLocation(this.program, 'a_position');
    const texcoordLocation = gl.getAttribLocation(this.program, 'a_texCoord');
    const resolutionLocation = gl.getUniformLocation(this.program, 'u_resolution');
    const translationLocation = gl.getUniformLocation(this.program, 'u_translation');
    const scaleLocation = gl.getUniformLocation(this.program, 'u_scale');

    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer);
    gl.enableVertexAttribArray(texcoordLocation);
    gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);

    gl.uniform2f(resolutionLocation, this.canvas.width, this.canvas.height);

    for (const sprite of [createBackgroundSprite(payload.background, this.canvas), ...payload.sprites]) {
      const asset = this.textures.get(sprite.asset);
      if (!asset || !asset.texture) continue;
      gl.bindTexture(gl.TEXTURE_2D, asset.texture);
      const flip = sprite.flip ? -1 : 1;
      const translateX = sprite.flip ? sprite.x + sprite.width : sprite.x;
      gl.uniform2f(translationLocation, translateX, sprite.y);
      gl.uniform2f(scaleLocation, sprite.width * flip, sprite.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
  }

  private renderCanvas(payload: RenderPayload) {
    if (!this.ctx2d) return;
    const ctx = this.ctx2d;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const sprites = [createBackgroundSprite(payload.background, this.canvas), ...payload.sprites];
    for (const sprite of sprites) {
      const asset = this.textures.get(sprite.asset);
      if (!asset) continue;
      ctx.save();
      if (sprite.flip) {
        ctx.translate(sprite.x + sprite.width, sprite.y);
        ctx.scale(-1, 1);
        ctx.drawImage(asset.image, 0, 0, sprite.width, sprite.height);
      } else {
        ctx.drawImage(asset.image, sprite.x, sprite.y, sprite.width, sprite.height);
      }
      ctx.restore();
    }
  }
}

function createBackgroundSprite(asset: string, canvas: HTMLCanvasElement): Sprite {
  return {
    id: 'background',
    asset,
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height,
  };
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = src;
    image.onload = () => resolve(image);
    image.onerror = reject;
  });
}
