
<script>
import { inject } from 'vue';

const canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d');
export default {
    name: "BeginLoading",
    data() {
        const width = 400,
            height = 100,
            loaderWidth = 310,
            loaderHeight = 16;
        return {
            playing: inject("playing"), // 是否播放
            progress: inject("loading"), // 进度条
            width: width,
            height: height,
            loaderWidth: loaderWidth,
            loaderHeight: loaderHeight,
            loaderX: width / 2 - loaderWidth / 2,
            loaderY: height / 2 - loaderHeight / 2,
            particles: [],
            particleLift: 180,
            particleRate: 4,
            hueStart: 0,
            hueEnd: 120,
            hue: 0,
            gravity: 0.12,
            dpr: window.devicePixelRatio
        }
    },
    mounted() {
        document.querySelector("#loading").appendChild(canvas);
        canvas.width = this.width;
        canvas.height = this.height;
        canvas.style.width = (this.width / this.dpr) + 'px';
        canvas.style.height = (this.height / this.dpr) + 'px';
        ctx.globalCompositeOperation = 'lighter';
        const _this = this;
        function Particle() {
            this.x = _this.loaderX + ((_this.progress / 100) * _this.loaderWidth) - _this.rand(0, 1);
            this.y = _this.height / 2 + _this.rand(0, _this.loaderHeight) - _this.loaderHeight / 2;
            this.vx = (_this.rand(0, 4) - 2) / 100;
            this.vy = (_this.rand(0, _this.particleLift) - _this.particleLift * 2) / 100;
            this.width = _this.rand(1, 4) / 2;
            this.height = _this.rand(1, 4) / 2;
            this.hue = _this.hue;
        }

        Particle.prototype.update = function (i) {
            this.vx += (_this.rand(0, 6) - 3) / 100;
            this.vy += _this.gravity;
            this.x += this.vx;
            this.y += this.vy;

            if (this.y > _this.height) {
                _this.particles.splice(i, 1);
            }
        };

        Particle.prototype.render = function () {
            ctx.fillStyle = 'hsla(' + this.hue + ', 100%, ' + _this.rand(50, 70) + '%, ' + _this.rand(20, 100) / 100 + ')';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        };

        function loop() {
            requestAnimationFrame(loop);
            if (_this.playing) {
                // _this.progress = parseInt(document.querySelector("#loading").dataset.progress);
                _this.clearCanvas();
                _this.createParticles(Particle);
                _this.updateParticles();
                _this.renderLoader();
                _this.renderParticles();
            } else {
                // _this.progress = parseInt(document.querySelector("#loading").dataset.progress);
                _this.clearCanvas();
                _this.renderLoader();
            }
        }
        loop()
    },
    methods: {
        rand(rMi, rMa) {
            return ~~((Math.random() * (rMa - rMi + 1)) + rMi);
        },
        renderLoader() {
            ctx.fillStyle = '#000';
            ctx.fillRect(this.loaderX, this.loaderY, this.loaderWidth, this.loaderHeight);

            this.hue = this.hueStart + (this.progress / 100) * (this.hueEnd - this.hueStart);

            var newWidth = (this.progress / 100) * this.loaderWidth;
            ctx.fillStyle = 'hsla(' + this.hue + ', 100%, 40%, 1)';
            ctx.fillRect(this.loaderX, this.loaderY, newWidth, this.loaderHeight);

            ctx.fillStyle = '#444';
            ctx.fillRect(this.loaderX, this.loaderY, newWidth, this.loaderHeight / 2);
        },
        createParticles(Particle) {
            var i = this.particleRate;
            while (i--) {
                this.particles.push(new Particle());
            }
        },
        updateParticles() {
            var i = this.particles.length;
            while (i--) {
                var p = this.particles[i];
                p.update(i);
            }
        },
        renderParticles() {
            var i = this.particles.length;
            while (i--) {
                var p = this.particles[i];
                p.render();
            }
        },
        clearCanvas() {
            ctx.clearRect(0, 0, this.width, this.height);
        }
    }
}
</script>

<template>
    <div id="loading" data-progress="0"></div>
</template>