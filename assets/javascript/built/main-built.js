/* Phaser (no physics) v2.0.2 - http://phaser.io - @photonstorm - (c) 2014 Photon Storm Ltd. */

define("module/Background", [], function () {
  var e = null,
    t = null;
  return {
    init: function (t, n, r) {
      e = t;
    },
    preload: function () {
      e.load.image("starfield", "assets/img/starfield.png");
    },
    create: function () {
      t = e.add.tileSprite(0, 0, 800, 600, "starfield");
    },
    update: function () {
      t.tilePosition.y += 2;
    },
  };
}),
  define("module/HUD", [], function () {
    var e = null,
      t = null,
      n = null,
      r = null,
      i = null,
      s = null,
      o = null,
      u = null;
    return {
      init: function (t) {
        e = t;
      },
      preload: function () {},
      createStat: function (u, a, f) {
        (s = u),
          (o = e.add.text(10, 10, "Score: " + u, {
            fontSize: "34px",
            fill: "#fff",
          })),
          (t = a),
          (n = e.add.text(10, 50, "Health: " + a, {
            fontSize: "34px",
            fill: "#fff",
          })),
          (r = f),
          (i = e.add.text(10, 90, "Lives: " + f, {
            fontSize: "34px",
            fill: "#fff",
          }));
      },
      updateHealthText: function (e) {
        n.text = "Health: " + e;
      },
      updateLivesText: function (e) {
        i.text = "Lives: " + e;
      },
      updateScoreText: function (e) {
        o.text = "Score: " + (s += e);
      },
      createTitle: function (t) {
        (u = e.add.text(e.world.centerX, e.world.centerY, t, {
          font: "84px Arial",
          fill: "#fff",
        })),
          u.anchor.setTo(0.5, 0.5);
      },
    };
  }),
  define("module/Player", ["module/HUD"], function (e) {
    var t = null,
      n = null,
      r = null,
      i = null,
      s = null,
      o = null,
      u = null,
      a = null,
      f = null,
      l = null,
      c = null,
      h = null,
      p = null,
      d = null,
      v = null,
      m = function () {
        (f = a.getFirstExists(!1)),
          f &&
            ((f.checkWorldBounds = !0),
            f.reset(o.x, o.y + 8),
            (f.body.velocity.y = -v));
      },
      g = function (i, s) {
        i.damage(s.bulletDamage),
          s.kill(),
          e.updateHealthText(i.health),
          i.health == 0 &&
            (this.stopShooting(),
            (c = l.getFirstExists(!1)),
            c.reset(o.body.x, o.body.y),
            c.play("kaboom", 30, !1, !0),
            r--,
            e.updateLivesText(r),
            r > 0 ? (i.revive(n), this.startShooting()) : t.state.start("End"));
      };
    return {
      init: function (e) {
        t = e;
      },
      preload: function () {
        t.load.image("ship", "assets/img/player.png");
      },
      create: function (e) {
        (o = t.add.sprite(400, 500, "ship")),
          o.anchor.setTo(0.5, 0.5),
          t.physics.enable(o, Phaser.Physics.ARCADE),
          (o.body.collideWorldBounds = !0),
          (o.health = e.health),
          (n = e.health),
          (r = e.lives),
          (i = e.score),
          (s = e.firingTime),
          (v = e.bulletSpeed),
          (u = t.input.keyboard.createCursorKeys());
      },
      update: function () {
        o.body.velocity.setTo(0, 0),
          u.left.isDown
            ? (o.body.velocity.x = -200)
            : u.right.isDown && (o.body.velocity.x = 200);
      },
      setBulletGroup: function (e) {
        a = e.getBulletGroup();
      },
      getBulletGroup: function () {
        return a;
      },
      setExplosionGroup: function (e) {
        l = e.getExplosionGroup();
      },
      startShooting: function () {
        d = t.time.events.loop(s, m, this);
      },
      stopShooting: function () {
        t.time.events.remove(d);
      },
      getPlayerShip: function () {
        return o;
      },
      createOverLap: function (e) {
        t.physics.arcade.overlap(o, e, g, null, this);
      },
      setAliensAndAlienGroup: function (e) {
        (p = e), (h = e.getAlienGroup());
      },
    };
  }),
  define("module/Aliens", ["module/HUD"], function (e) {
    var t = null,
      n = null,
      r = function (r) {
        function S() {
          for (var e = 0; e < s; e++)
            for (var n = 0; n < o; n++)
              (h = i.create(e * 48, n * 50, "invader")),
                (h.health = l),
                (h.myScore = u),
                h.anchor.setTo(0.5, 0.5),
                h.animations.add("fly", [0, 1, 2, 3], 20, !0),
                h.play("fly"),
                (h.body.moves = !1);
          (i.x = 100),
            (i.y = 50),
            (p = t.add.tween(i).to({ x: 200 }, 2e3, c, !0, 0, 1e3, !0));
        }
        var i = t.add.group(),
          s = r.cols,
          o = r.rows,
          u = r.scoreValue,
          a = r.firingTime,
          f = r.bulletSpeed,
          l = r.health,
          c = r.easing,
          h = null,
          p = null,
          d = null,
          v = null,
          m = null,
          g = null,
          y = [],
          b = null,
          w = null,
          E = null;
        (i.enableBody = !0), (i.physicsBodyType = Phaser.Physics.ARCADE), S();
        var x = function () {
            (v = d.getFirstExists(!1)),
              (y = []),
              i.forEachAlive(function (e) {
                y.push(e);
              }),
              v && y.length > 0
                ? ((v.checkWorldBounds = !0),
                  (b = t.rnd.integerInRange(0, y.length)),
                  (w = y[b]),
                  w &&
                    (v.reset(w.body.x, w.body.y),
                    t.physics.arcade.moveToObject(v, n, f)))
                : y.length == 0 && t.state.start("End");
          },
          T = function (t, n) {
            n.damage(t.bulletDamage),
              t.kill(),
              n.health == 0 &&
                ((g = m.getFirstExists(!1)),
                g.reset(n.body.x, n.body.y),
                g.play("kaboom", 30, !1, !0)),
              e.updateScoreText(n.myScore);
          };
        return {
          setBulletGroup: function (e) {
            d = e.getBulletGroup();
          },
          getBulletGroup: function () {
            return d;
          },
          setExplosionGroup: function (e) {
            m = e.getExplosionGroup();
          },
          startShooting: function () {
            E = t.time.events.loop(a, x, this);
          },
          stopShooting: function () {
            t.time.events.remove(E);
          },
          createOverLap: function (e) {
            t.physics.arcade.overlap(e, i, T, null, this);
          },
          getAlienGroup: function () {
            return i;
          },
        };
      };
    return {
      init: function (e) {
        t = e;
      },
      preload: function () {
        t.load.spritesheet("invader", "assets/img/invader32x32x4.png", 32, 32);
      },
      create: function (e) {
        return new r(e);
      },
      setPlayerShip: function (e) {
        n = e;
      },
    };
  }),
  define("module/Bullets", [], function () {
    var e = null,
      t = function (t, n, r) {
        var i = e.add.group();
        return (
          (i.enableBody = !0),
          (i.physicsBodyType = Phaser.Physics.ARCADE),
          i.createMultiple(t, n),
          i.setAll("anchor.x", 0.5),
          i.setAll("anchor.y", 1),
          i.setAll("outOfBoundsKill", !0),
          i.setAll("bulletDamage", r),
          {
            getBulletGroup: function () {
              return i;
            },
          }
        );
      };
    return {
      init: function (t) {
        e = t;
      },
      preload: function () {
        e.load.image("bullet", "assets/img/bullet.png"),
          e.load.image("enemyBullet", "assets/img/enemy-bullet.png");
      },
      create: function (e, n, r) {
        return new t(e, n, r);
      },
    };
  }),
  define("module/Explosions", [], function () {
    var e = null,
      t = function (t, n) {
        function s(e) {
          (e.anchor.x = 0.5), (e.anchor.y = 0.5), e.animations.add(n);
        }
        var r = e.add.group();
        r.createMultiple(t, n), r.forEach(s, this);
        var i = n;
        return {
          getExplosionGroup: function () {
            return r;
          },
        };
      };
    return {
      init: function (t) {
        e = t;
      },
      preload: function () {
        e.load.spritesheet("kaboom", "assets/img/explode.png", 128, 128);
      },
      create: function (e, n) {
        return new t(e, n);
      },
    };
  }),
  define(
    "state/Load",
    [
      "module/Background",
      "module/Player",
      "module/Aliens",
      "module/Bullets",
      "module/Explosions",
      "module/HUD",
    ],
    function (e, t, n, r, i, s) {
      var o = null,
        u = null,
        a = {
          preload: function () {
            e.init(o, 0, "easy"),
              e.preload(),
              s.init(o),
              t.init(o),
              t.preload(),
              n.init(o),
              n.preload(),
              r.init(o),
              r.preload(),
              i.init(o),
              i.preload();
          },
          create: function () {
            o.state.start(u);
          },
        };
      return {
        init: function (e, t) {
          (o = e), (u = t);
        },
        getLoadState: function () {
          return a;
        },
      };
    }
  ),
  define("state/Start", ["module/HUD"], function (e) {
    var t = null,
      n = null,
      r = null,
      i = {
        create: function () {
          e.createTitle(" Space Invader \n Press Spacebar"),
            t.physics.startSystem(Phaser.Physics.ARCADE),
            t.input.keyboard
              .addKey(Phaser.Keyboard.SPACEBAR)
              .onDown.addOnce(function () {
                t.state.start(n);
              });
        },
      };
    return {
      init: function (e, r) {
        (t = e), (n = r);
      },
      getStartState: function () {
        return i;
      },
    };
  }),
  define(
    "state/Play",
    [
      "module/Background",
      "module/Player",
      "module/Aliens",
      "module/Bullets",
      "module/Explosions",
      "module/HUD",
    ],
    function (e, t, n, r, i, s) {
      var o = null,
        u = null,
        a = null,
        f = {
          create: function () {
            e.create(), s.createStat(0, 100, 3);
            var o = {
              health: 100,
              lives: 3,
              score: 0,
              firingTime: 300,
              bulletSpeed: 500,
            };
            t.create(o),
              t.setBulletGroup(r.create(10, "bullet", 100)),
              t.setExplosionGroup(i.create(1, "kaboom"));
            var u = {
              rows: 4,
              cols: 10,
              scoreValue: 10,
              firingTime: 200,
              bulletSpeed: 200,
              health: 100,
              easing: Phaser.Easing.Linear.None,
            };
            (a = n.create(u)),
              a.setBulletGroup(r.create(30, "enemyBullet", 10)),
              a.setExplosionGroup(i.create(5, "kaboom")),
              n.setPlayerShip(t.getPlayerShip()),
              t.setAliensAndAlienGroup(a),
              t.startShooting(),
              a.startShooting();
          },
          update: function () {
            e.update(),
              t.update(),
              a.createOverLap(t.getBulletGroup()),
              t.createOverLap(a.getBulletGroup());
          },
        };
      return {
        init: function (e, t) {
          (o = e), (u = t);
        },
        getPlayState: function () {
          return f;
        },
      };
    }
  ),
  define("state/End", ["module/HUD"], function (e) {
    var t = null,
      n = null,
      r = {
        create: function () {
          e.createTitle("  Game Over \n Press Spacebar"),
            t.input.keyboard
              .addKey(Phaser.Keyboard.SPACEBAR)
              .onDown.addOnce(function () {
                t.state.start(n);
              });
        },
      };
    return {
      init: function (e, r) {
        (t = e), (n = r);
      },
      getEndState: function () {
        return r;
      },
    };
  }),
  function () {
    var e = this,
      t = t || {};
    (t.WEBGL_RENDERER = 0),
      (t.CANVAS_RENDERER = 1),
      (t.VERSION = "v1.5.0"),
      (t.blendModes = {
        NORMAL: 0,
        ADD: 1,
        MULTIPLY: 2,
        SCREEN: 3,
        OVERLAY: 4,
        DARKEN: 5,
        LIGHTEN: 6,
        COLOR_DODGE: 7,
        COLOR_BURN: 8,
        HARD_LIGHT: 9,
        SOFT_LIGHT: 10,
        DIFFERENCE: 11,
        EXCLUSION: 12,
        HUE: 13,
        SATURATION: 14,
        COLOR: 15,
        LUMINOSITY: 16,
      }),
      (t.scaleModes = { DEFAULT: 0, LINEAR: 0, NEAREST: 1 }),
      (t.INTERACTION_FREQUENCY = 30),
      (t.AUTO_PREVENT_DEFAULT = !0),
      (t.RAD_TO_DEG = 180 / Math.PI),
      (t.DEG_TO_RAD = Math.PI / 180),
      (t.Point = function (e, t) {
        (this.x = e || 0), (this.y = t || 0);
      }),
      (t.Point.prototype.clone = function () {
        return new t.Point(this.x, this.y);
      }),
      (t.Point.prototype.constructor = t.Point),
      (t.Point.prototype.set = function (e, t) {
        (this.x = e || 0), (this.y = t || (0 !== t ? this.x : 0));
      }),
      (t.Rectangle = function (e, t, n, r) {
        (this.x = e || 0),
          (this.y = t || 0),
          (this.width = n || 0),
          (this.height = r || 0);
      }),
      (t.Rectangle.prototype.clone = function () {
        return new t.Rectangle(this.x, this.y, this.width, this.height);
      }),
      (t.Rectangle.prototype.contains = function (e, t) {
        if (this.width <= 0 || this.height <= 0) return !1;
        var n = this.x;
        if (e >= n && e <= n + this.width) {
          var r = this.y;
          if (t >= r && t <= r + this.height) return !0;
        }
        return !1;
      }),
      (t.Rectangle.prototype.constructor = t.Rectangle),
      (t.EmptyRectangle = new t.Rectangle(0, 0, 0, 0)),
      (t.Polygon = function (e) {
        if (
          (e instanceof Array || (e = Array.prototype.slice.call(arguments)),
          "number" == typeof e[0])
        ) {
          for (var n = [], r = 0, i = e.length; i > r; r += 2)
            n.push(new t.Point(e[r], e[r + 1]));
          e = n;
        }
        this.points = e;
      }),
      (t.Polygon.prototype.clone = function () {
        for (var e = [], n = 0; n < this.points.length; n++)
          e.push(this.points[n].clone());
        return new t.Polygon(e);
      }),
      (t.Polygon.prototype.contains = function (e, t) {
        for (
          var n = !1, r = 0, i = this.points.length - 1;
          r < this.points.length;
          i = r++
        ) {
          var s = this.points[r].x,
            o = this.points[r].y,
            u = this.points[i].x,
            a = this.points[i].y,
            f = o > t != a > t && ((u - s) * (t - o)) / (a - o) + s > e;
          f && (n = !n);
        }
        return n;
      }),
      (t.Polygon.prototype.constructor = t.Polygon),
      (t.Circle = function (e, t, n) {
        (this.x = e || 0), (this.y = t || 0), (this.radius = n || 0);
      }),
      (t.Circle.prototype.clone = function () {
        return new t.Circle(this.x, this.y, this.radius);
      }),
      (t.Circle.prototype.contains = function (e, t) {
        if (this.radius <= 0) return !1;
        var n = this.x - e,
          r = this.y - t,
          i = this.radius * this.radius;
        return (n *= n), (r *= r), i >= n + r;
      }),
      (t.Circle.prototype.constructor = t.Circle),
      (t.Ellipse = function (e, t, n, r) {
        (this.x = e || 0),
          (this.y = t || 0),
          (this.width = n || 0),
          (this.height = r || 0);
      }),
      (t.Ellipse.prototype.clone = function () {
        return new t.Ellipse(this.x, this.y, this.width, this.height);
      }),
      (t.Ellipse.prototype.contains = function (e, t) {
        if (this.width <= 0 || this.height <= 0) return !1;
        var n = (e - this.x) / this.width,
          r = (t - this.y) / this.height;
        return (n *= n), (r *= r), 1 >= n + r;
      }),
      (t.Ellipse.prototype.getBounds = function () {
        return new t.Rectangle(this.x, this.y, this.width, this.height);
      }),
      (t.Ellipse.prototype.constructor = t.Ellipse),
      (t.determineMatrixArrayType = function () {
        return "undefined" != typeof Float32Array ? Float32Array : Array;
      }),
      (t.Matrix2 = t.determineMatrixArrayType()),
      (t.Matrix = function () {
        (this.a = 1),
          (this.b = 0),
          (this.c = 0),
          (this.d = 1),
          (this.tx = 0),
          (this.ty = 0);
      }),
      (t.Matrix.prototype.fromArray = function (e) {
        (this.a = e[0]),
          (this.b = e[1]),
          (this.c = e[3]),
          (this.d = e[4]),
          (this.tx = e[2]),
          (this.ty = e[5]);
      }),
      (t.Matrix.prototype.toArray = function (e) {
        this.array || (this.array = new Float32Array(9));
        var t = this.array;
        return (
          e
            ? ((this.array[0] = this.a),
              (this.array[1] = this.c),
              (this.array[2] = 0),
              (this.array[3] = this.b),
              (this.array[4] = this.d),
              (this.array[5] = 0),
              (this.array[6] = this.tx),
              (this.array[7] = this.ty),
              (this.array[8] = 1))
            : ((this.array[0] = this.a),
              (this.array[1] = this.b),
              (this.array[2] = this.tx),
              (this.array[3] = this.c),
              (this.array[4] = this.d),
              (this.array[5] = this.ty),
              (this.array[6] = 0),
              (this.array[7] = 0),
              (this.array[8] = 1)),
          t
        );
      }),
      (t.identityMatrix = new t.Matrix()),
      (t.DisplayObject = function () {
        (this.position = new t.Point()),
          (this.scale = new t.Point(1, 1)),
          (this.pivot = new t.Point(0, 0)),
          (this.rotation = 0),
          (this.alpha = 1),
          (this.visible = !0),
          (this.hitArea = null),
          (this.buttonMode = !1),
          (this.renderable = !1),
          (this.parent = null),
          (this.stage = null),
          (this.worldAlpha = 1),
          (this._interactive = !1),
          (this.defaultCursor = "pointer"),
          (this.worldTransform = new t.Matrix()),
          (this.color = []),
          (this.dynamic = !0),
          (this._sr = 0),
          (this._cr = 1),
          (this.filterArea = new t.Rectangle(0, 0, 1, 1)),
          (this._bounds = new t.Rectangle(0, 0, 1, 1)),
          (this._currentBounds = null),
          (this._mask = null),
          (this._cacheAsBitmap = !1),
          (this._cacheIsDirty = !1);
      }),
      (t.DisplayObject.prototype.constructor = t.DisplayObject),
      (t.DisplayObject.prototype.setInteractive = function (e) {
        this.interactive = e;
      }),
      Object.defineProperty(t.DisplayObject.prototype, "interactive", {
        get: function () {
          return this._interactive;
        },
        set: function (e) {
          (this._interactive = e), this.stage && (this.stage.dirty = !0);
        },
      }),
      Object.defineProperty(t.DisplayObject.prototype, "worldVisible", {
        get: function () {
          var e = this;
          do {
            if (!e.visible) return !1;
            e = e.parent;
          } while (e);
          return !0;
        },
      }),
      Object.defineProperty(t.DisplayObject.prototype, "mask", {
        get: function () {
          return this._mask;
        },
        set: function (e) {
          this._mask && (this._mask.isMask = !1),
            (this._mask = e),
            this._mask && (this._mask.isMask = !0);
        },
      }),
      Object.defineProperty(t.DisplayObject.prototype, "filters", {
        get: function () {
          return this._filters;
        },
        set: function (e) {
          if (e) {
            for (var t = [], n = 0; n < e.length; n++)
              for (var r = e[n].passes, i = 0; i < r.length; i++) t.push(r[i]);
            this._filterBlock = { target: this, filterPasses: t };
          }
          this._filters = e;
        },
      }),
      Object.defineProperty(t.DisplayObject.prototype, "cacheAsBitmap", {
        get: function () {
          return this._cacheAsBitmap;
        },
        set: function (e) {
          this._cacheAsBitmap !== e &&
            (e ? this._generateCachedSprite() : this._destroyCachedSprite(),
            (this._cacheAsBitmap = e));
        },
      }),
      (t.DisplayObject.prototype.updateTransform = function () {
        this.rotation !== this.rotationCache &&
          ((this.rotationCache = this.rotation),
          (this._sr = Math.sin(this.rotation)),
          (this._cr = Math.cos(this.rotation)));
        var e = this.parent.worldTransform,
          t = this.worldTransform,
          n = this.pivot.x,
          r = this.pivot.y,
          i = this._cr * this.scale.x,
          s = -this._sr * this.scale.y,
          o = this._sr * this.scale.x,
          u = this._cr * this.scale.y,
          a = this.position.x - i * n - r * s,
          f = this.position.y - u * r - n * o,
          l = e.a,
          c = e.b,
          h = e.c,
          p = e.d;
        (t.a = l * i + c * o),
          (t.b = l * s + c * u),
          (t.tx = l * a + c * f + e.tx),
          (t.c = h * i + p * o),
          (t.d = h * s + p * u),
          (t.ty = h * a + p * f + e.ty),
          (this.worldAlpha = this.alpha * this.parent.worldAlpha);
      }),
      (t.DisplayObject.prototype.getBounds = function (e) {
        return (e = e), t.EmptyRectangle;
      }),
      (t.DisplayObject.prototype.getLocalBounds = function () {
        return this.getBounds(t.identityMatrix);
      }),
      (t.DisplayObject.prototype.setStageReference = function (e) {
        (this.stage = e), this._interactive && (this.stage.dirty = !0);
      }),
      (t.DisplayObject.prototype.generateTexture = function (e) {
        var n = this.getLocalBounds(),
          r = new t.RenderTexture(0 | n.width, 0 | n.height, e);
        return r.render(this), r;
      }),
      (t.DisplayObject.prototype.updateCache = function () {
        this._generateCachedSprite();
      }),
      (t.DisplayObject.prototype._renderCachedSprite = function (e) {
        e.gl
          ? t.Sprite.prototype._renderWebGL.call(this._cachedSprite, e)
          : t.Sprite.prototype._renderCanvas.call(this._cachedSprite, e);
      }),
      (t.DisplayObject.prototype._generateCachedSprite = function () {
        this._cacheAsBitmap = !1;
        var e = this.getLocalBounds();
        if (this._cachedSprite)
          this._cachedSprite.texture.resize(0 | e.width, 0 | e.height);
        else {
          var n = new t.RenderTexture(0 | e.width, 0 | e.height);
          (this._cachedSprite = new t.Sprite(n)),
            (this._cachedSprite.worldTransform = this.worldTransform);
        }
        var r = this._filters;
        (this._filters = null),
          (this._cachedSprite.filters = r),
          this._cachedSprite.texture.render(this),
          (this._filters = r),
          (this._cacheAsBitmap = !0);
      }),
      (t.DisplayObject.prototype._destroyCachedSprite = function () {
        this._cachedSprite &&
          (this._cachedSprite.texture.destroy(!0), (this._cachedSprite = null));
      }),
      (t.DisplayObject.prototype._renderWebGL = function (e) {
        e = e;
      }),
      (t.DisplayObject.prototype._renderCanvas = function (e) {
        e = e;
      }),
      Object.defineProperty(t.DisplayObject.prototype, "x", {
        get: function () {
          return this.position.x;
        },
        set: function (e) {
          this.position.x = e;
        },
      }),
      Object.defineProperty(t.DisplayObject.prototype, "y", {
        get: function () {
          return this.position.y;
        },
        set: function (e) {
          this.position.y = e;
        },
      }),
      (t.DisplayObjectContainer = function () {
        t.DisplayObject.call(this), (this.children = []);
      }),
      (t.DisplayObjectContainer.prototype = Object.create(
        t.DisplayObject.prototype
      )),
      (t.DisplayObjectContainer.prototype.constructor =
        t.DisplayObjectContainer),
      (t.DisplayObjectContainer.prototype.addChild = function (e) {
        this.addChildAt(e, this.children.length);
      }),
      (t.DisplayObjectContainer.prototype.addChildAt = function (e, t) {
        if (!(t >= 0 && t <= this.children.length))
          throw new Error(
            e +
              " The index " +
              t +
              " supplied is out of bounds " +
              this.children.length
          );
        e.parent && e.parent.removeChild(e),
          (e.parent = this),
          this.children.splice(t, 0, e),
          this.stage && e.setStageReference(this.stage);
      }),
      (t.DisplayObjectContainer.prototype.swapChildren = function (e, t) {
        if (e !== t) {
          var n = this.children.indexOf(e),
            r = this.children.indexOf(t);
          if (0 > n || 0 > r)
            throw new Error(
              "swapChildren: Both the supplied DisplayObjects must be a child of the caller."
            );
          (this.children[n] = t), (this.children[r] = e);
        }
      }),
      (t.DisplayObjectContainer.prototype.getChildAt = function (e) {
        if (e >= 0 && e < this.children.length) return this.children[e];
        throw new Error(
          "The supplied DisplayObjects must be a child of the caller " + this
        );
      }),
      (t.DisplayObjectContainer.prototype.removeChild = function (e) {
        var t = this.children.indexOf(e);
        if (-1 === t)
          throw new Error(
            e +
              " The supplied DisplayObject must be a child of the caller " +
              this
          );
        this.stage && e.removeStageReference(),
          (e.parent = void 0),
          this.children.splice(t, 1);
      }),
      (t.DisplayObjectContainer.prototype.updateTransform = function () {
        if (
          this.visible &&
          (t.DisplayObject.prototype.updateTransform.call(this),
          !this._cacheAsBitmap)
        )
          for (var e = 0, n = this.children.length; n > e; e++)
            this.children[e].updateTransform();
      }),
      (t.DisplayObjectContainer.prototype.getBounds = function (e) {
        if (0 === this.children.length) return t.EmptyRectangle;
        if (e) {
          var n = this.worldTransform;
          (this.worldTransform = e),
            this.updateTransform(),
            (this.worldTransform = n);
        }
        for (
          var r,
            i,
            s,
            o = 1 / 0,
            u = 1 / 0,
            a = -1 / 0,
            f = -1 / 0,
            l = !1,
            c = 0,
            h = this.children.length;
          h > c;
          c++
        ) {
          var p = this.children[c];
          p.visible &&
            ((l = !0),
            (r = this.children[c].getBounds(e)),
            (o = o < r.x ? o : r.x),
            (u = u < r.y ? u : r.y),
            (i = r.width + r.x),
            (s = r.height + r.y),
            (a = a > i ? a : i),
            (f = f > s ? f : s));
        }
        if (!l) return t.EmptyRectangle;
        var d = this._bounds;
        return (d.x = o), (d.y = u), (d.width = a - o), (d.height = f - u), d;
      }),
      (t.DisplayObjectContainer.prototype.getLocalBounds = function () {
        var e = this.worldTransform;
        this.worldTransform = t.identityMatrix;
        for (var n = 0, r = this.children.length; r > n; n++)
          this.children[n].updateTransform();
        var i = this.getBounds();
        return (this.worldTransform = e), i;
      }),
      (t.DisplayObjectContainer.prototype.setStageReference = function (e) {
        (this.stage = e), this._interactive && (this.stage.dirty = !0);
        for (var t = 0, n = this.children.length; n > t; t++) {
          var r = this.children[t];
          r.setStageReference(e);
        }
      }),
      (t.DisplayObjectContainer.prototype.removeStageReference = function () {
        for (var e = 0, t = this.children.length; t > e; e++) {
          var n = this.children[e];
          n.removeStageReference();
        }
        this._interactive && (this.stage.dirty = !0), (this.stage = null);
      }),
      (t.DisplayObjectContainer.prototype._renderWebGL = function (e) {
        if (this.visible && !(this.alpha <= 0)) {
          if (this._cacheAsBitmap) return void this._renderCachedSprite(e);
          var t, n;
          if (this._mask || this._filters) {
            for (
              this._mask &&
                (e.spriteBatch.stop(),
                e.maskManager.pushMask(this.mask, e),
                e.spriteBatch.start()),
                this._filters &&
                  (e.spriteBatch.flush(),
                  e.filterManager.pushFilter(this._filterBlock)),
                t = 0,
                n = this.children.length;
              n > t;
              t++
            )
              this.children[t]._renderWebGL(e);
            e.spriteBatch.stop(),
              this._filters && e.filterManager.popFilter(),
              this._mask && e.maskManager.popMask(e),
              e.spriteBatch.start();
          } else
            for (t = 0, n = this.children.length; n > t; t++)
              this.children[t]._renderWebGL(e);
        }
      }),
      (t.DisplayObjectContainer.prototype._renderCanvas = function (e) {
        if (this.visible !== !1 && 0 !== this.alpha) {
          if (this._cacheAsBitmap) return void this._renderCachedSprite(e);
          this._mask && e.maskManager.pushMask(this._mask, e.context);
          for (var t = 0, n = this.children.length; n > t; t++) {
            var r = this.children[t];
            r._renderCanvas(e);
          }
          this._mask && e.maskManager.popMask(e.context);
        }
      }),
      (t.Sprite = function (e) {
        t.DisplayObjectContainer.call(this),
          (this.anchor = new t.Point()),
          (this.texture = e),
          (this._width = 0),
          (this._height = 0),
          (this.tint = 16777215),
          (this.blendMode = t.blendModes.NORMAL),
          e.baseTexture.hasLoaded
            ? this.onTextureUpdate()
            : ((this.onTextureUpdateBind = this.onTextureUpdate.bind(this)),
              this.texture.addEventListener(
                "update",
                this.onTextureUpdateBind
              )),
          (this.renderable = !0);
      }),
      (t.Sprite.prototype = Object.create(t.DisplayObjectContainer.prototype)),
      (t.Sprite.prototype.constructor = t.Sprite),
      Object.defineProperty(t.Sprite.prototype, "width", {
        get: function () {
          return this.scale.x * this.texture.frame.width;
        },
        set: function (e) {
          (this.scale.x = e / this.texture.frame.width), (this._width = e);
        },
      }),
      Object.defineProperty(t.Sprite.prototype, "height", {
        get: function () {
          return this.scale.y * this.texture.frame.height;
        },
        set: function (e) {
          (this.scale.y = e / this.texture.frame.height), (this._height = e);
        },
      }),
      (t.Sprite.prototype.setTexture = function (e) {
        this.texture.baseTexture !== e.baseTexture
          ? ((this.textureChange = !0), (this.texture = e))
          : (this.texture = e),
          (this.cachedTint = 16777215),
          (this.updateFrame = !0);
      }),
      (t.Sprite.prototype.onTextureUpdate = function () {
        this._width && (this.scale.x = this._width / this.texture.frame.width),
          this._height &&
            (this.scale.y = this._height / this.texture.frame.height),
          (this.updateFrame = !0);
      }),
      (t.Sprite.prototype.getBounds = function (e) {
        var t = this.texture.frame.width,
          n = this.texture.frame.height,
          r = t * (1 - this.anchor.x),
          i = t * -this.anchor.x,
          s = n * (1 - this.anchor.y),
          o = n * -this.anchor.y,
          u = e || this.worldTransform,
          a = u.a,
          f = u.c,
          l = u.b,
          c = u.d,
          h = u.tx,
          p = u.ty,
          d = a * i + l * o + h,
          v = c * o + f * i + p,
          m = a * r + l * o + h,
          g = c * o + f * r + p,
          y = a * r + l * s + h,
          b = c * s + f * r + p,
          w = a * i + l * s + h,
          E = c * s + f * i + p,
          S = -1 / 0,
          x = -1 / 0,
          T = 1 / 0,
          N = 1 / 0;
        (T = T > d ? d : T),
          (T = T > m ? m : T),
          (T = T > y ? y : T),
          (T = T > w ? w : T),
          (N = N > v ? v : N),
          (N = N > g ? g : N),
          (N = N > b ? b : N),
          (N = N > E ? E : N),
          (S = d > S ? d : S),
          (S = m > S ? m : S),
          (S = y > S ? y : S),
          (S = w > S ? w : S),
          (x = v > x ? v : x),
          (x = g > x ? g : x),
          (x = b > x ? b : x),
          (x = E > x ? E : x);
        var C = this._bounds;
        return (
          (C.x = T),
          (C.width = S - T),
          (C.y = N),
          (C.height = x - N),
          (this._currentBounds = C),
          C
        );
      }),
      (t.Sprite.prototype._renderWebGL = function (e) {
        if (this.visible && !(this.alpha <= 0)) {
          var t, n;
          if (this._mask || this._filters) {
            var r = e.spriteBatch;
            for (
              this._mask &&
                (r.stop(), e.maskManager.pushMask(this.mask, e), r.start()),
                this._filters &&
                  (r.flush(), e.filterManager.pushFilter(this._filterBlock)),
                r.render(this),
                t = 0,
                n = this.children.length;
              n > t;
              t++
            )
              this.children[t]._renderWebGL(e);
            r.stop(),
              this._filters && e.filterManager.popFilter(),
              this._mask && e.maskManager.popMask(e),
              r.start();
          } else
            for (
              e.spriteBatch.render(this), t = 0, n = this.children.length;
              n > t;
              t++
            )
              this.children[t]._renderWebGL(e);
        }
      }),
      (t.Sprite.prototype._renderCanvas = function (e) {
        if (this.visible !== !1 && 0 !== this.alpha) {
          var n = this.texture.frame,
            r = e.context,
            i = this.texture;
          if (
            (this.blendMode !== e.currentBlendMode &&
              ((e.currentBlendMode = this.blendMode),
              (r.globalCompositeOperation =
                t.blendModesCanvas[e.currentBlendMode])),
            this._mask && e.maskManager.pushMask(this._mask, e.context),
            n && n.width && n.height && i.baseTexture.source)
          ) {
            r.globalAlpha = this.worldAlpha;
            var s = this.worldTransform;
            if (
              (e.roundPixels
                ? r.setTransform(s.a, s.c, s.b, s.d, 0 | s.tx, 0 | s.ty)
                : r.setTransform(s.a, s.c, s.b, s.d, s.tx, s.ty),
              e.smoothProperty &&
                e.scaleMode !== this.texture.baseTexture.scaleMode &&
                ((e.scaleMode = this.texture.baseTexture.scaleMode),
                (r[e.smoothProperty] = e.scaleMode === t.scaleModes.LINEAR)),
              16777215 !== this.tint)
            ) {
              if (this.cachedTint !== this.tint) {
                if (!i.baseTexture.hasLoaded) return;
                (this.cachedTint = this.tint),
                  (this.tintedTexture = t.CanvasTinter.getTintedTexture(
                    this,
                    this.tint
                  ));
              }
              r.drawImage(
                this.tintedTexture,
                0,
                0,
                n.width,
                n.height,
                this.anchor.x * -n.width,
                this.anchor.y * -n.height,
                n.width,
                n.height
              );
            } else if (i.trim) {
              var o = i.trim;
              r.drawImage(
                this.texture.baseTexture.source,
                n.x,
                n.y,
                n.width,
                n.height,
                o.x - this.anchor.x * o.width,
                o.y - this.anchor.y * o.height,
                n.width,
                n.height
              );
            } else
              r.drawImage(
                this.texture.baseTexture.source,
                n.x,
                n.y,
                n.width,
                n.height,
                this.anchor.x * -n.width,
                this.anchor.y * -n.height,
                n.width,
                n.height
              );
          }
          for (var u = 0, a = this.children.length; a > u; u++) {
            var f = this.children[u];
            f._renderCanvas(e);
          }
          this._mask && e.maskManager.popMask(e.context);
        }
      }),
      (t.Sprite.fromFrame = function (e) {
        var n = t.TextureCache[e];
        if (!n)
          throw new Error(
            'The frameId "' + e + '" does not exist in the texture cache' + this
          );
        return new t.Sprite(n);
      }),
      (t.Sprite.fromImage = function (e, n, r) {
        var i = t.Texture.fromImage(e, n, r);
        return new t.Sprite(i);
      }),
      (t.SpriteBatch = function (e) {
        t.DisplayObjectContainer.call(this),
          (this.textureThing = e),
          (this.ready = !1);
      }),
      (t.SpriteBatch.prototype = Object.create(
        t.DisplayObjectContainer.prototype
      )),
      (t.SpriteBatch.constructor = t.SpriteBatch),
      (t.SpriteBatch.prototype.initWebGL = function (e) {
        (this.fastSpriteBatch = new t.WebGLFastSpriteBatch(e)),
          (this.ready = !0);
      }),
      (t.SpriteBatch.prototype.updateTransform = function () {
        t.DisplayObject.prototype.updateTransform.call(this);
      }),
      (t.SpriteBatch.prototype._renderWebGL = function (e) {
        !this.visible ||
          this.alpha <= 0 ||
          !this.children.length ||
          (this.ready || this.initWebGL(e.gl),
          e.spriteBatch.stop(),
          e.shaderManager.activateShader(e.shaderManager.fastShader),
          this.fastSpriteBatch.begin(this, e),
          this.fastSpriteBatch.render(this),
          e.shaderManager.activateShader(e.shaderManager.defaultShader),
          e.spriteBatch.start());
      }),
      (t.SpriteBatch.prototype._renderCanvas = function (e) {
        var n = e.context;
        (n.globalAlpha = this.worldAlpha),
          t.DisplayObject.prototype.updateTransform.call(this);
        for (
          var r = this.worldTransform, i = !0, s = 0;
          s < this.children.length;
          s++
        ) {
          var o = this.children[s];
          if (o.visible) {
            var u = o.texture,
              a = u.frame;
            if (
              ((n.globalAlpha = this.worldAlpha * o.alpha),
              o.rotation % (2 * Math.PI) === 0)
            )
              i && (n.setTransform(r.a, r.c, r.b, r.d, r.tx, r.ty), (i = !1)),
                n.drawImage(
                  u.baseTexture.source,
                  a.x,
                  a.y,
                  a.width,
                  a.height,
                  (o.anchor.x * -a.width * o.scale.x + o.position.x + 0.5) | 0,
                  (o.anchor.y * -a.height * o.scale.y + o.position.y + 0.5) | 0,
                  a.width * o.scale.x,
                  a.height * o.scale.y
                );
            else {
              i || (i = !0), t.DisplayObject.prototype.updateTransform.call(o);
              var f = o.worldTransform;
              e.roundPixels
                ? n.setTransform(f.a, f.c, f.b, f.d, 0 | f.tx, 0 | f.ty)
                : n.setTransform(f.a, f.c, f.b, f.d, f.tx, f.ty),
                n.drawImage(
                  u.baseTexture.source,
                  a.x,
                  a.y,
                  a.width,
                  a.height,
                  (o.anchor.x * -a.width + 0.5) | 0,
                  (o.anchor.y * -a.height + 0.5) | 0,
                  a.width,
                  a.height
                );
            }
          }
        }
      }),
      (t.FilterBlock = function () {
        (this.visible = !0), (this.renderable = !0);
      }),
      (t.Text = function (e, n) {
        (this.canvas = document.createElement("canvas")),
          (this.context = this.canvas.getContext("2d")),
          t.Sprite.call(this, t.Texture.fromCanvas(this.canvas)),
          this.setText(e),
          this.setStyle(n),
          this.updateText(),
          (this.dirty = !1);
      }),
      (t.Text.prototype = Object.create(t.Sprite.prototype)),
      (t.Text.prototype.constructor = t.Text),
      (t.Text.prototype.setStyle = function (e) {
        (e = e || {}),
          (e.font = e.font || "bold 20pt Arial"),
          (e.fill = e.fill || "black"),
          (e.align = e.align || "left"),
          (e.stroke = e.stroke || "black"),
          (e.strokeThickness = e.strokeThickness || 0),
          (e.wordWrap = e.wordWrap || !1),
          (e.wordWrapWidth = e.wordWrapWidth || 100),
          (this.style = e),
          (this.dirty = !0);
      }),
      (t.Text.prototype.setText = function (e) {
        (this.text = e.toString() || " "), (this.dirty = !0);
      }),
      (t.Text.prototype.updateText = function () {
        this.context.font = this.style.font;
        var e = this.text;
        this.style.wordWrap && (e = this.wordWrap(this.text));
        for (
          var n = e.split(/(?:\r\n|\r|\n)/), r = [], i = 0, s = 0;
          s < n.length;
          s++
        ) {
          var o = this.context.measureText(n[s]).width;
          (r[s] = o), (i = Math.max(i, o));
        }
        this.canvas.width = i + this.style.strokeThickness;
        var u =
          this.determineFontHeight("font: " + this.style.font + ";") +
          this.style.strokeThickness;
        for (
          this.canvas.height = u * n.length,
            navigator.isCocoonJS &&
              this.context.clearRect(
                0,
                0,
                this.canvas.width,
                this.canvas.height
              ),
            this.context.fillStyle = this.style.fill,
            this.context.font = this.style.font,
            this.context.strokeStyle = this.style.stroke,
            this.context.lineWidth = this.style.strokeThickness,
            this.context.textBaseline = "top",
            s = 0;
          s < n.length;
          s++
        ) {
          var a = new t.Point(
            this.style.strokeThickness / 2,
            this.style.strokeThickness / 2 + s * u
          );
          "right" === this.style.align
            ? (a.x += i - r[s])
            : "center" === this.style.align && (a.x += (i - r[s]) / 2),
            this.style.stroke &&
              this.style.strokeThickness &&
              this.context.strokeText(n[s], a.x, a.y),
            this.style.fill && this.context.fillText(n[s], a.x, a.y);
        }
        this.updateTexture();
      }),
      (t.Text.prototype.updateTexture = function () {
        (this.texture.baseTexture.width = this.canvas.width),
          (this.texture.baseTexture.height = this.canvas.height),
          (this.texture.frame.width = this.canvas.width),
          (this.texture.frame.height = this.canvas.height),
          (this._width = this.canvas.width),
          (this._height = this.canvas.height),
          (this.requiresUpdate = !0);
      }),
      (t.Text.prototype._renderWebGL = function (e) {
        this.requiresUpdate &&
          ((this.requiresUpdate = !1),
          t.updateWebGLTexture(this.texture.baseTexture, e.gl)),
          t.Sprite.prototype._renderWebGL.call(this, e);
      }),
      (t.Text.prototype.updateTransform = function () {
        this.dirty && (this.updateText(), (this.dirty = !1)),
          t.Sprite.prototype.updateTransform.call(this);
      }),
      (t.Text.prototype.determineFontHeight = function (e) {
        var n = t.Text.heightCache[e];
        if (!n) {
          var r = document.getElementsByTagName("body")[0],
            i = document.createElement("div"),
            s = document.createTextNode("M");
          i.appendChild(s),
            i.setAttribute("style", e + ";position:absolute;top:0;left:0"),
            r.appendChild(i),
            (n = i.offsetHeight),
            (t.Text.heightCache[e] = n),
            r.removeChild(i);
        }
        return n;
      }),
      (t.Text.prototype.wordWrap = function (e) {
        for (var t = "", n = e.split("\n"), r = 0; r < n.length; r++) {
          for (
            var i = this.style.wordWrapWidth, s = n[r].split(" "), o = 0;
            o < s.length;
            o++
          ) {
            var u = this.context.measureText(s[o]).width,
              a = u + this.context.measureText(" ").width;
            a > i
              ? (o > 0 && (t += "\n"),
                (t += s[o] + " "),
                (i = this.style.wordWrapWidth - u))
              : ((i -= a), (t += s[o] + " "));
          }
          r < n.length - 1 && (t += "\n");
        }
        return t;
      }),
      (t.Text.prototype.destroy = function (e) {
        e && this.texture.destroy();
      }),
      (t.Text.heightCache = {}),
      (t.BitmapText = function (e, n) {
        t.DisplayObjectContainer.call(this),
          (this._pool = []),
          this.setText(e),
          this.setStyle(n),
          this.updateText(),
          (this.dirty = !1);
      }),
      (t.BitmapText.prototype = Object.create(
        t.DisplayObjectContainer.prototype
      )),
      (t.BitmapText.prototype.constructor = t.BitmapText),
      (t.BitmapText.prototype.setText = function (e) {
        (this.text = e || " "), (this.dirty = !0);
      }),
      (t.BitmapText.prototype.setStyle = function (e) {
        (e = e || {}), (e.align = e.align || "left"), (this.style = e);
        var n = e.font.split(" ");
        (this.fontName = n[n.length - 1]),
          (this.fontSize =
            n.length >= 2
              ? parseInt(n[n.length - 2], 10)
              : t.BitmapText.fonts[this.fontName].size),
          (this.dirty = !0),
          (this.tint = e.tint);
      }),
      (t.BitmapText.prototype.updateText = function () {
        for (
          var e = t.BitmapText.fonts[this.fontName],
            n = new t.Point(),
            r = null,
            i = [],
            s = 0,
            o = [],
            u = 0,
            a = this.fontSize / e.size,
            f = 0;
          f < this.text.length;
          f++
        ) {
          var l = this.text.charCodeAt(f);
          if (/(?:\r\n|\r|\n)/.test(this.text.charAt(f)))
            o.push(n.x),
              (s = Math.max(s, n.x)),
              u++,
              (n.x = 0),
              (n.y += e.lineHeight),
              (r = null);
          else {
            var c = e.chars[l];
            c &&
              (r && c[r] && (n.x += c.kerning[r]),
              i.push({
                texture: c.texture,
                line: u,
                charCode: l,
                position: new t.Point(n.x + c.xOffset, n.y + c.yOffset),
              }),
              (n.x += c.xAdvance),
              (r = l));
          }
        }
        o.push(n.x), (s = Math.max(s, n.x));
        var h = [];
        for (f = 0; u >= f; f++) {
          var p = 0;
          "right" === this.style.align
            ? (p = s - o[f])
            : "center" === this.style.align && (p = (s - o[f]) / 2),
            h.push(p);
        }
        var d = this.children.length,
          v = i.length,
          m = this.tint || 16777215;
        for (f = 0; v > f; f++) {
          var g = d > f ? this.children[f] : this._pool.pop();
          g ? g.setTexture(i[f].texture) : (g = new t.Sprite(i[f].texture)),
            (g.position.x = (i[f].position.x + h[i[f].line]) * a),
            (g.position.y = i[f].position.y * a),
            (g.scale.x = g.scale.y = a),
            (g.tint = m),
            g.parent || this.addChild(g);
        }
        for (; this.children.length > v; ) {
          var y = this.getChildAt(this.children.length - 1);
          this._pool.push(y), this.removeChild(y);
        }
        (this.textWidth = s * a), (this.textHeight = (n.y + e.lineHeight) * a);
      }),
      (t.BitmapText.prototype.updateTransform = function () {
        this.dirty && (this.updateText(), (this.dirty = !1)),
          t.DisplayObjectContainer.prototype.updateTransform.call(this);
      }),
      (t.BitmapText.fonts = {}),
      (t.Stage = function (e) {
        t.DisplayObjectContainer.call(this),
          (this.worldTransform = new t.Matrix()),
          (this.interactive = !0),
          (this.interactionManager = new t.InteractionManager(this)),
          (this.dirty = !0),
          (this.stage = this),
          (this.stage.hitArea = new t.Rectangle(0, 0, 1e5, 1e5)),
          this.setBackgroundColor(e);
      }),
      (t.Stage.prototype = Object.create(t.DisplayObjectContainer.prototype)),
      (t.Stage.prototype.constructor = t.Stage),
      (t.Stage.prototype.setInteractionDelegate = function (e) {
        this.interactionManager.setTargetDomElement(e);
      }),
      (t.Stage.prototype.updateTransform = function () {
        this.worldAlpha = 1;
        for (var e = 0, t = this.children.length; t > e; e++)
          this.children[e].updateTransform();
        this.dirty && ((this.dirty = !1), (this.interactionManager.dirty = !0)),
          this.interactive && this.interactionManager.update();
      }),
      (t.Stage.prototype.setBackgroundColor = function (e) {
        (this.backgroundColor = e || 0),
          (this.backgroundColorSplit = t.hex2rgb(this.backgroundColor));
        var n = this.backgroundColor.toString(16);
        (n = "000000".substr(0, 6 - n.length) + n),
          (this.backgroundColorString = "#" + n);
      }),
      (t.Stage.prototype.getMousePosition = function () {
        return this.interactionManager.mouse.global;
      });
    for (
      var n = 0, r = ["ms", "moz", "webkit", "o"], i = 0;
      i < r.length && !window.requestAnimationFrame;
      ++i
    )
      (window.requestAnimationFrame = window[r[i] + "RequestAnimationFrame"]),
        (window.cancelAnimationFrame =
          window[r[i] + "CancelAnimationFrame"] ||
          window[r[i] + "CancelRequestAnimationFrame"]);
    window.requestAnimationFrame ||
      (window.requestAnimationFrame = function (e) {
        var t = new Date().getTime(),
          r = Math.max(0, 16 - (t - n)),
          i = window.setTimeout(function () {
            e(t + r);
          }, r);
        return (n = t + r), i;
      }),
      window.cancelAnimationFrame ||
        (window.cancelAnimationFrame = function (e) {
          clearTimeout(e);
        }),
      (window.requestAnimFrame = window.requestAnimationFrame),
      (t.hex2rgb = function (e) {
        return [
          ((e >> 16) & 255) / 255,
          ((e >> 8) & 255) / 255,
          (255 & e) / 255,
        ];
      }),
      (t.rgb2hex = function (e) {
        return ((255 * e[0]) << 16) + ((255 * e[1]) << 8) + 255 * e[2];
      }),
      "function" != typeof Function.prototype.bind &&
        (Function.prototype.bind = (function () {
          var e = Array.prototype.slice;
          return function (t) {
            function n() {
              var s = i.concat(e.call(arguments));
              r.apply(this instanceof n ? this : t, s);
            }
            var r = this,
              i = e.call(arguments, 1);
            if ("function" != typeof r) throw new TypeError();
            return (
              (n.prototype = (function s(e) {
                return (
                  e && (s.prototype = e), this instanceof s ? void 0 : new s()
                );
              })(r.prototype)),
              n
            );
          };
        })()),
      (t.AjaxRequest = function () {
        var e = [
          "Msxml2.XMLHTTP.6.0",
          "Msxml2.XMLHTTP.3.0",
          "Microsoft.XMLHTTP",
        ];
        if (!window.ActiveXObject)
          return window.XMLHttpRequest ? new window.XMLHttpRequest() : !1;
        for (var t = 0; t < e.length; t++)
          try {
            return new window.ActiveXObject(e[t]);
          } catch (n) {}
      }),
      (t.canUseNewCanvasBlendModes = function () {
        var e = document.createElement("canvas");
        (e.width = 1), (e.height = 1);
        var t = e.getContext("2d");
        return (
          (t.fillStyle = "#000"),
          t.fillRect(0, 0, 1, 1),
          (t.globalCompositeOperation = "multiply"),
          (t.fillStyle = "#fff"),
          t.fillRect(0, 0, 1, 1),
          0 === t.getImageData(0, 0, 1, 1).data[0]
        );
      }),
      (t.getNextPowerOfTwo = function (e) {
        if (e > 0 && 0 === (e & (e - 1))) return e;
        for (var t = 1; e > t; ) t <<= 1;
        return t;
      }),
      (t.EventTarget = function () {
        var e = {};
        (this.addEventListener = this.on =
          function (t, n) {
            void 0 === e[t] && (e[t] = []),
              -1 === e[t].indexOf(n) && e[t].push(n);
          }),
          (this.dispatchEvent = this.emit =
            function (t) {
              if (e[t.type] && e[t.type].length)
                for (var n = 0, r = e[t.type].length; r > n; n++)
                  e[t.type][n](t);
            }),
          (this.removeEventListener = this.off =
            function (t, n) {
              var r = e[t].indexOf(n);
              -1 !== r && e[t].splice(r, 1);
            }),
          (this.removeAllEventListeners = function (t) {
            var n = e[t];
            n && (n.length = 0);
          });
      }),
      (t.PolyK = {}),
      (t.PolyK.Triangulate = function (e) {
        var n = !0,
          r = e.length >> 1;
        if (3 > r) return [];
        for (var i = [], s = [], o = 0; r > o; o++) s.push(o);
        o = 0;
        for (var u = r; u > 3; ) {
          var a = s[(o + 0) % u],
            f = s[(o + 1) % u],
            l = s[(o + 2) % u],
            c = e[2 * a],
            h = e[2 * a + 1],
            p = e[2 * f],
            d = e[2 * f + 1],
            v = e[2 * l],
            m = e[2 * l + 1],
            g = !1;
          if (t.PolyK._convex(c, h, p, d, v, m, n)) {
            g = !0;
            for (var y = 0; u > y; y++) {
              var w = s[y];
              if (
                w !== a &&
                w !== f &&
                w !== l &&
                t.PolyK._PointInTriangle(
                  e[2 * w],
                  e[2 * w + 1],
                  c,
                  h,
                  p,
                  d,
                  v,
                  m
                )
              ) {
                g = !1;
                break;
              }
            }
          }
          if (g) i.push(a, f, l), s.splice((o + 1) % u, 1), u--, (o = 0);
          else if (o++ > 3 * u) {
            if (!n)
              return (
                window.console.log("PIXI Warning: shape too complex to fill"),
                []
              );
            for (i = [], s = [], o = 0; r > o; o++) s.push(o);
            (o = 0), (u = r), (n = !1);
          }
        }
        return i.push(s[0], s[1], s[2]), i;
      }),
      (t.PolyK._PointInTriangle = function (e, t, n, r, i, s, o, u) {
        var a = o - n,
          f = u - r,
          l = i - n,
          c = s - r,
          h = e - n,
          p = t - r,
          d = a * a + f * f,
          v = a * l + f * c,
          m = a * h + f * p,
          g = l * l + c * c,
          y = l * h + c * p,
          b = 1 / (d * g - v * v),
          w = (g * m - v * y) * b,
          E = (d * y - v * m) * b;
        return w >= 0 && E >= 0 && 1 > w + E;
      }),
      (t.PolyK._convex = function (e, t, n, r, i, s, o) {
        return (t - r) * (i - n) + (n - e) * (s - r) >= 0 === o;
      }),
      (t.initDefaultShaders = function () {}),
      (t.CompileVertexShader = function (e, n) {
        return t._CompileShader(e, n, e.VERTEX_SHADER);
      }),
      (t.CompileFragmentShader = function (e, n) {
        return t._CompileShader(e, n, e.FRAGMENT_SHADER);
      }),
      (t._CompileShader = function (e, t, n) {
        var r = t.join("\n"),
          i = e.createShader(n);
        return (
          e.shaderSource(i, r),
          e.compileShader(i),
          e.getShaderParameter(i, e.COMPILE_STATUS)
            ? i
            : (window.console.log(e.getShaderInfoLog(i)), null)
        );
      }),
      (t.compileProgram = function (e, n, r) {
        var i = t.CompileFragmentShader(e, r),
          s = t.CompileVertexShader(e, n),
          o = e.createProgram();
        return (
          e.attachShader(o, s),
          e.attachShader(o, i),
          e.linkProgram(o),
          e.getProgramParameter(o, e.LINK_STATUS) ||
            window.console.log("Could not initialise shaders"),
          o
        );
      }),
      (t.PixiShader = function (e) {
        (this.gl = e),
          (this.program = null),
          (this.fragmentSrc = [
            "precision lowp float;",
            "varying vec2 vTextureCoord;",
            "varying vec4 vColor;",
            "uniform sampler2D uSampler;",
            "void main(void) {",
            "   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;",
            "}",
          ]),
          (this.textureCount = 0),
          (this.attributes = []),
          this.init();
      }),
      (t.PixiShader.prototype.init = function () {
        var e = this.gl,
          n = t.compileProgram(
            e,
            this.vertexSrc || t.PixiShader.defaultVertexSrc,
            this.fragmentSrc
          );
        e.useProgram(n),
          (this.uSampler = e.getUniformLocation(n, "uSampler")),
          (this.projectionVector = e.getUniformLocation(n, "projectionVector")),
          (this.offsetVector = e.getUniformLocation(n, "offsetVector")),
          (this.dimensions = e.getUniformLocation(n, "dimensions")),
          (this.aVertexPosition = e.getAttribLocation(n, "aVertexPosition")),
          (this.aTextureCoord = e.getAttribLocation(n, "aTextureCoord")),
          (this.colorAttribute = e.getAttribLocation(n, "aColor")),
          -1 === this.colorAttribute && (this.colorAttribute = 2),
          (this.attributes = [
            this.aVertexPosition,
            this.aTextureCoord,
            this.colorAttribute,
          ]);
        for (var r in this.uniforms)
          this.uniforms[r].uniformLocation = e.getUniformLocation(n, r);
        this.initUniforms(), (this.program = n);
      }),
      (t.PixiShader.prototype.initUniforms = function () {
        this.textureCount = 1;
        var e,
          t = this.gl;
        for (var n in this.uniforms) {
          e = this.uniforms[n];
          var r = e.type;
          "sampler2D" === r
            ? ((e._init = !1), null !== e.value && this.initSampler2D(e))
            : "mat2" === r || "mat3" === r || "mat4" === r
            ? ((e.glMatrix = !0),
              (e.glValueLength = 1),
              "mat2" === r
                ? (e.glFunc = t.uniformMatrix2fv)
                : "mat3" === r
                ? (e.glFunc = t.uniformMatrix3fv)
                : "mat4" === r && (e.glFunc = t.uniformMatrix4fv))
            : ((e.glFunc = t["uniform" + r]),
              (e.glValueLength =
                "2f" === r || "2i" === r
                  ? 2
                  : "3f" === r || "3i" === r
                  ? 3
                  : "4f" === r || "4i" === r
                  ? 4
                  : 1));
        }
      }),
      (t.PixiShader.prototype.initSampler2D = function (e) {
        if (e.value && e.value.baseTexture && e.value.baseTexture.hasLoaded) {
          var t = this.gl;
          if (
            (t.activeTexture(t["TEXTURE" + this.textureCount]),
            t.bindTexture(t.TEXTURE_2D, e.value.baseTexture._glTextures[t.id]),
            e.textureData)
          ) {
            var n = e.textureData,
              r = n.magFilter ? n.magFilter : t.LINEAR,
              i = n.minFilter ? n.minFilter : t.LINEAR,
              s = n.wrapS ? n.wrapS : t.CLAMP_TO_EDGE,
              o = n.wrapT ? n.wrapT : t.CLAMP_TO_EDGE,
              u = n.luminance ? t.LUMINANCE : t.RGBA;
            if (
              (n.repeat && ((s = t.REPEAT), (o = t.REPEAT)),
              t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !!n.flipY),
              n.width)
            ) {
              var a = n.width ? n.width : 512,
                f = n.height ? n.height : 2,
                l = n.border ? n.border : 0;
              t.texImage2D(
                t.TEXTURE_2D,
                0,
                u,
                a,
                f,
                l,
                u,
                t.UNSIGNED_BYTE,
                null
              );
            } else
              t.texImage2D(
                t.TEXTURE_2D,
                0,
                u,
                t.RGBA,
                t.UNSIGNED_BYTE,
                e.value.baseTexture.source
              );
            t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, r),
              t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, i),
              t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, s),
              t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, o);
          }
          t.uniform1i(e.uniformLocation, this.textureCount),
            (e._init = !0),
            this.textureCount++;
        }
      }),
      (t.PixiShader.prototype.syncUniforms = function () {
        this.textureCount = 1;
        var e,
          n = this.gl;
        for (var r in this.uniforms)
          (e = this.uniforms[r]),
            1 === e.glValueLength
              ? e.glMatrix === !0
                ? e.glFunc.call(n, e.uniformLocation, e.transpose, e.value)
                : e.glFunc.call(n, e.uniformLocation, e.value)
              : 2 === e.glValueLength
              ? e.glFunc.call(n, e.uniformLocation, e.value.x, e.value.y)
              : 3 === e.glValueLength
              ? e.glFunc.call(
                  n,
                  e.uniformLocation,
                  e.value.x,
                  e.value.y,
                  e.value.z
                )
              : 4 === e.glValueLength
              ? e.glFunc.call(
                  n,
                  e.uniformLocation,
                  e.value.x,
                  e.value.y,
                  e.value.z,
                  e.value.w
                )
              : "sampler2D" === e.type &&
                (e._init
                  ? (n.activeTexture(n["TEXTURE" + this.textureCount]),
                    n.bindTexture(
                      n.TEXTURE_2D,
                      e.value.baseTexture._glTextures[n.id] ||
                        t.createWebGLTexture(e.value.baseTexture, n)
                    ),
                    n.uniform1i(e.uniformLocation, this.textureCount),
                    this.textureCount++)
                  : this.initSampler2D(e));
      }),
      (t.PixiShader.prototype.destroy = function () {
        this.gl.deleteProgram(this.program),
          (this.uniforms = null),
          (this.gl = null),
          (this.attributes = null);
      }),
      (t.PixiShader.defaultVertexSrc = [
        "attribute vec2 aVertexPosition;",
        "attribute vec2 aTextureCoord;",
        "attribute vec2 aColor;",
        "uniform vec2 projectionVector;",
        "uniform vec2 offsetVector;",
        "varying vec2 vTextureCoord;",
        "varying vec4 vColor;",
        "const vec2 center = vec2(-1.0, 1.0);",
        "void main(void) {",
        "   gl_Position = vec4( ((aVertexPosition + offsetVector) / projectionVector) + center , 0.0, 1.0);",
        "   vTextureCoord = aTextureCoord;",
        "   vec3 color = mod(vec3(aColor.y/65536.0, aColor.y/256.0, aColor.y), 256.0) / 256.0;",
        "   vColor = vec4(color * aColor.x, aColor.x);",
        "}",
      ]),
      (t.PixiFastShader = function (e) {
        (this.gl = e),
          (this.program = null),
          (this.fragmentSrc = [
            "precision lowp float;",
            "varying vec2 vTextureCoord;",
            "varying float vColor;",
            "uniform sampler2D uSampler;",
            "void main(void) {",
            "   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;",
            "}",
          ]),
          (this.vertexSrc = [
            "attribute vec2 aVertexPosition;",
            "attribute vec2 aPositionCoord;",
            "attribute vec2 aScale;",
            "attribute float aRotation;",
            "attribute vec2 aTextureCoord;",
            "attribute float aColor;",
            "uniform vec2 projectionVector;",
            "uniform vec2 offsetVector;",
            "uniform mat3 uMatrix;",
            "varying vec2 vTextureCoord;",
            "varying float vColor;",
            "const vec2 center = vec2(-1.0, 1.0);",
            "void main(void) {",
            "   vec2 v;",
            "   vec2 sv = aVertexPosition * aScale;",
            "   v.x = (sv.x) * cos(aRotation) - (sv.y) * sin(aRotation);",
            "   v.y = (sv.x) * sin(aRotation) + (sv.y) * cos(aRotation);",
            "   v = ( uMatrix * vec3(v + aPositionCoord , 1.0) ).xy ;",
            "   gl_Position = vec4( ( v / projectionVector) + center , 0.0, 1.0);",
            "   vTextureCoord = aTextureCoord;",
            "   vColor = aColor;",
            "}",
          ]),
          (this.textureCount = 0),
          this.init();
      }),
      (t.PixiFastShader.prototype.init = function () {
        var e = this.gl,
          n = t.compileProgram(e, this.vertexSrc, this.fragmentSrc);
        e.useProgram(n),
          (this.uSampler = e.getUniformLocation(n, "uSampler")),
          (this.projectionVector = e.getUniformLocation(n, "projectionVector")),
          (this.offsetVector = e.getUniformLocation(n, "offsetVector")),
          (this.dimensions = e.getUniformLocation(n, "dimensions")),
          (this.uMatrix = e.getUniformLocation(n, "uMatrix")),
          (this.aVertexPosition = e.getAttribLocation(n, "aVertexPosition")),
          (this.aPositionCoord = e.getAttribLocation(n, "aPositionCoord")),
          (this.aScale = e.getAttribLocation(n, "aScale")),
          (this.aRotation = e.getAttribLocation(n, "aRotation")),
          (this.aTextureCoord = e.getAttribLocation(n, "aTextureCoord")),
          (this.colorAttribute = e.getAttribLocation(n, "aColor")),
          -1 === this.colorAttribute && (this.colorAttribute = 2),
          (this.attributes = [
            this.aVertexPosition,
            this.aPositionCoord,
            this.aScale,
            this.aRotation,
            this.aTextureCoord,
            this.colorAttribute,
          ]),
          (this.program = n);
      }),
      (t.PixiFastShader.prototype.destroy = function () {
        this.gl.deleteProgram(this.program),
          (this.uniforms = null),
          (this.gl = null),
          (this.attributes = null);
      }),
      (t.StripShader = function () {
        (this.program = null),
          (this.fragmentSrc = [
            "precision mediump float;",
            "varying vec2 vTextureCoord;",
            "varying float vColor;",
            "uniform float alpha;",
            "uniform sampler2D uSampler;",
            "void main(void) {",
            "   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));",
            "   gl_FragColor = gl_FragColor * alpha;",
            "}",
          ]),
          (this.vertexSrc = [
            "attribute vec2 aVertexPosition;",
            "attribute vec2 aTextureCoord;",
            "attribute float aColor;",
            "uniform mat3 translationMatrix;",
            "uniform vec2 projectionVector;",
            "varying vec2 vTextureCoord;",
            "uniform vec2 offsetVector;",
            "varying float vColor;",
            "void main(void) {",
            "   vec3 v = translationMatrix * vec3(aVertexPosition, 1.0);",
            "   v -= offsetVector.xyx;",
            "   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / projectionVector.y + 1.0 , 0.0, 1.0);",
            "   vTextureCoord = aTextureCoord;",
            "   vColor = aColor;",
            "}",
          ]);
      }),
      (t.StripShader.prototype.init = function () {
        var e = t.gl,
          n = t.compileProgram(e, this.vertexSrc, this.fragmentSrc);
        e.useProgram(n),
          (this.uSampler = e.getUniformLocation(n, "uSampler")),
          (this.projectionVector = e.getUniformLocation(n, "projectionVector")),
          (this.offsetVector = e.getUniformLocation(n, "offsetVector")),
          (this.colorAttribute = e.getAttribLocation(n, "aColor")),
          (this.aVertexPosition = e.getAttribLocation(n, "aVertexPosition")),
          (this.aTextureCoord = e.getAttribLocation(n, "aTextureCoord")),
          (this.translationMatrix = e.getUniformLocation(
            n,
            "translationMatrix"
          )),
          (this.alpha = e.getUniformLocation(n, "alpha")),
          (this.program = n);
      }),
      (t.PrimitiveShader = function (e) {
        (this.gl = e),
          (this.program = null),
          (this.fragmentSrc = [
            "precision mediump float;",
            "varying vec4 vColor;",
            "void main(void) {",
            "   gl_FragColor = vColor;",
            "}",
          ]),
          (this.vertexSrc = [
            "attribute vec2 aVertexPosition;",
            "attribute vec4 aColor;",
            "uniform mat3 translationMatrix;",
            "uniform vec2 projectionVector;",
            "uniform vec2 offsetVector;",
            "uniform float alpha;",
            "uniform vec3 tint;",
            "varying vec4 vColor;",
            "void main(void) {",
            "   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);",
            "   v -= offsetVector.xyx;",
            "   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);",
            "   vColor = aColor * vec4(tint * alpha, alpha);",
            "}",
          ]),
          this.init();
      }),
      (t.PrimitiveShader.prototype.init = function () {
        var e = this.gl,
          n = t.compileProgram(e, this.vertexSrc, this.fragmentSrc);
        e.useProgram(n),
          (this.projectionVector = e.getUniformLocation(n, "projectionVector")),
          (this.offsetVector = e.getUniformLocation(n, "offsetVector")),
          (this.tintColor = e.getUniformLocation(n, "tint")),
          (this.aVertexPosition = e.getAttribLocation(n, "aVertexPosition")),
          (this.colorAttribute = e.getAttribLocation(n, "aColor")),
          (this.attributes = [this.aVertexPosition, this.colorAttribute]),
          (this.translationMatrix = e.getUniformLocation(
            n,
            "translationMatrix"
          )),
          (this.alpha = e.getUniformLocation(n, "alpha")),
          (this.program = n);
      }),
      (t.PrimitiveShader.prototype.destroy = function () {
        this.gl.deleteProgram(this.program),
          (this.uniforms = null),
          (this.gl = null),
          (this.attribute = null);
      }),
      (t.WebGLGraphics = function () {}),
      (t.WebGLGraphics.renderGraphics = function (e, n) {
        var r = n.gl,
          i = n.projection,
          s = n.offset,
          o = n.shaderManager.primitiveShader;
        e._webGL[r.id] ||
          (e._webGL[r.id] = {
            points: [],
            indices: [],
            lastIndex: 0,
            buffer: r.createBuffer(),
            indexBuffer: r.createBuffer(),
          });
        var u = e._webGL[r.id];
        e.dirty &&
          ((e.dirty = !1),
          e.clearDirty &&
            ((e.clearDirty = !1),
            (u.lastIndex = 0),
            (u.points = []),
            (u.indices = [])),
          t.WebGLGraphics.updateGraphics(e, r)),
          n.shaderManager.activatePrimitiveShader(),
          r.blendFunc(r.ONE, r.ONE_MINUS_SRC_ALPHA),
          r.uniformMatrix3fv(
            o.translationMatrix,
            !1,
            e.worldTransform.toArray(!0)
          ),
          r.uniform2f(o.projectionVector, i.x, -i.y),
          r.uniform2f(o.offsetVector, -s.x, -s.y),
          r.uniform3fv(o.tintColor, t.hex2rgb(e.tint)),
          r.uniform1f(o.alpha, e.worldAlpha),
          r.bindBuffer(r.ARRAY_BUFFER, u.buffer),
          r.vertexAttribPointer(o.aVertexPosition, 2, r.FLOAT, !1, 24, 0),
          r.vertexAttribPointer(o.colorAttribute, 4, r.FLOAT, !1, 24, 8),
          r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, u.indexBuffer),
          r.drawElements(
            r.TRIANGLE_STRIP,
            u.indices.length,
            r.UNSIGNED_SHORT,
            0
          ),
          n.shaderManager.deactivatePrimitiveShader();
      }),
      (t.WebGLGraphics.updateGraphics = function (e, n) {
        for (
          var r = e._webGL[n.id], i = r.lastIndex;
          i < e.graphicsData.length;
          i++
        ) {
          var s = e.graphicsData[i];
          s.type === t.Graphics.POLY
            ? (s.fill && s.points.length > 3 && t.WebGLGraphics.buildPoly(s, r),
              s.lineWidth > 0 && t.WebGLGraphics.buildLine(s, r))
            : s.type === t.Graphics.RECT
            ? t.WebGLGraphics.buildRectangle(s, r)
            : (s.type === t.Graphics.CIRC || s.type === t.Graphics.ELIP) &&
              t.WebGLGraphics.buildCircle(s, r);
        }
        (r.lastIndex = e.graphicsData.length),
          (r.glPoints = new Float32Array(r.points)),
          n.bindBuffer(n.ARRAY_BUFFER, r.buffer),
          n.bufferData(n.ARRAY_BUFFER, r.glPoints, n.STATIC_DRAW),
          (r.glIndicies = new Uint16Array(r.indices)),
          n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, r.indexBuffer),
          n.bufferData(n.ELEMENT_ARRAY_BUFFER, r.glIndicies, n.STATIC_DRAW);
      }),
      (t.WebGLGraphics.buildRectangle = function (e, n) {
        var r = e.points,
          i = r[0],
          s = r[1],
          o = r[2],
          u = r[3];
        if (e.fill) {
          var a = t.hex2rgb(e.fillColor),
            f = e.fillAlpha,
            l = a[0] * f,
            c = a[1] * f,
            h = a[2] * f,
            p = n.points,
            d = n.indices,
            v = p.length / 6;
          p.push(i, s),
            p.push(l, c, h, f),
            p.push(i + o, s),
            p.push(l, c, h, f),
            p.push(i, s + u),
            p.push(l, c, h, f),
            p.push(i + o, s + u),
            p.push(l, c, h, f),
            d.push(v, v, v + 1, v + 2, v + 3, v + 3);
        }
        if (e.lineWidth) {
          var m = e.points;
          (e.points = [i, s, i + o, s, i + o, s + u, i, s + u, i, s]),
            t.WebGLGraphics.buildLine(e, n),
            (e.points = m);
        }
      }),
      (t.WebGLGraphics.buildCircle = function (e, n) {
        var r = e.points,
          i = r[0],
          s = r[1],
          o = r[2],
          u = r[3],
          a = 40,
          f = (2 * Math.PI) / a,
          l = 0;
        if (e.fill) {
          var c = t.hex2rgb(e.fillColor),
            h = e.fillAlpha,
            p = c[0] * h,
            d = c[1] * h,
            v = c[2] * h,
            m = n.points,
            g = n.indices,
            y = m.length / 6;
          for (g.push(y), l = 0; a + 1 > l; l++)
            m.push(i, s, p, d, v, h),
              m.push(
                i + Math.sin(f * l) * o,
                s + Math.cos(f * l) * u,
                p,
                d,
                v,
                h
              ),
              g.push(y++, y++);
          g.push(y - 1);
        }
        if (e.lineWidth) {
          var w = e.points;
          for (e.points = [], l = 0; a + 1 > l; l++)
            e.points.push(i + Math.sin(f * l) * o, s + Math.cos(f * l) * u);
          t.WebGLGraphics.buildLine(e, n), (e.points = w);
        }
      }),
      (t.WebGLGraphics.buildLine = function (e, n) {
        var r = 0,
          i = e.points;
        if (0 !== i.length) {
          if (e.lineWidth % 2) for (r = 0; r < i.length; r++) i[r] += 0.5;
          var s = new t.Point(i[0], i[1]),
            o = new t.Point(i[i.length - 2], i[i.length - 1]);
          if (s.x === o.x && s.y === o.y) {
            i.pop(),
              i.pop(),
              (o = new t.Point(i[i.length - 2], i[i.length - 1]));
            var u = o.x + 0.5 * (s.x - o.x),
              a = o.y + 0.5 * (s.y - o.y);
            i.unshift(u, a), i.push(u, a);
          }
          var f,
            l,
            c,
            h,
            p,
            d,
            v,
            m,
            g,
            y,
            w,
            E,
            S,
            x,
            T,
            N,
            C,
            k,
            L,
            A,
            O,
            M,
            _,
            D = n.points,
            P = n.indices,
            H = i.length / 2,
            B = i.length,
            j = D.length / 6,
            F = e.lineWidth / 2,
            I = t.hex2rgb(e.lineColor),
            q = e.lineAlpha,
            R = I[0] * q,
            U = I[1] * q,
            z = I[2] * q;
          for (
            c = i[0],
              h = i[1],
              p = i[2],
              d = i[3],
              g = -(h - d),
              y = c - p,
              _ = Math.sqrt(g * g + y * y),
              g /= _,
              y /= _,
              g *= F,
              y *= F,
              D.push(c - g, h - y, R, U, z, q),
              D.push(c + g, h + y, R, U, z, q),
              r = 1;
            H - 1 > r;
            r++
          )
            (c = i[2 * (r - 1)]),
              (h = i[2 * (r - 1) + 1]),
              (p = i[2 * r]),
              (d = i[2 * r + 1]),
              (v = i[2 * (r + 1)]),
              (m = i[2 * (r + 1) + 1]),
              (g = -(h - d)),
              (y = c - p),
              (_ = Math.sqrt(g * g + y * y)),
              (g /= _),
              (y /= _),
              (g *= F),
              (y *= F),
              (w = -(d - m)),
              (E = p - v),
              (_ = Math.sqrt(w * w + E * E)),
              (w /= _),
              (E /= _),
              (w *= F),
              (E *= F),
              (T = -y + h - (-y + d)),
              (N = -g + p - (-g + c)),
              (C = (-g + c) * (-y + d) - (-g + p) * (-y + h)),
              (k = -E + m - (-E + d)),
              (L = -w + p - (-w + v)),
              (A = (-w + v) * (-E + d) - (-w + p) * (-E + m)),
              (O = T * L - k * N),
              Math.abs(O) < 0.1
                ? ((O += 10.1),
                  D.push(p - g, d - y, R, U, z, q),
                  D.push(p + g, d + y, R, U, z, q))
                : ((f = (N * A - L * C) / O),
                  (l = (k * C - T * A) / O),
                  (M = (f - p) * (f - p) + (l - d) + (l - d)),
                  M > 19600
                    ? ((S = g - w),
                      (x = y - E),
                      (_ = Math.sqrt(S * S + x * x)),
                      (S /= _),
                      (x /= _),
                      (S *= F),
                      (x *= F),
                      D.push(p - S, d - x),
                      D.push(R, U, z, q),
                      D.push(p + S, d + x),
                      D.push(R, U, z, q),
                      D.push(p - S, d - x),
                      D.push(R, U, z, q),
                      B++)
                    : (D.push(f, l),
                      D.push(R, U, z, q),
                      D.push(p - (f - p), d - (l - d)),
                      D.push(R, U, z, q)));
          for (
            c = i[2 * (H - 2)],
              h = i[2 * (H - 2) + 1],
              p = i[2 * (H - 1)],
              d = i[2 * (H - 1) + 1],
              g = -(h - d),
              y = c - p,
              _ = Math.sqrt(g * g + y * y),
              g /= _,
              y /= _,
              g *= F,
              y *= F,
              D.push(p - g, d - y),
              D.push(R, U, z, q),
              D.push(p + g, d + y),
              D.push(R, U, z, q),
              P.push(j),
              r = 0;
            B > r;
            r++
          )
            P.push(j++);
          P.push(j - 1);
        }
      }),
      (t.WebGLGraphics.buildPoly = function (e, n) {
        var r = e.points;
        if (!(r.length < 6)) {
          var i = n.points,
            s = n.indices,
            o = r.length / 2,
            u = t.hex2rgb(e.fillColor),
            a = e.fillAlpha,
            f = u[0] * a,
            l = u[1] * a,
            c = u[2] * a,
            h = t.PolyK.Triangulate(r),
            p = i.length / 6,
            d = 0;
          for (d = 0; d < h.length; d += 3)
            s.push(h[d] + p),
              s.push(h[d] + p),
              s.push(h[d + 1] + p),
              s.push(h[d + 2] + p),
              s.push(h[d + 2] + p);
          for (d = 0; o > d; d++) i.push(r[2 * d], r[2 * d + 1], f, l, c, a);
        }
      }),
      (t.glContexts = []),
      (t.WebGLRenderer = function (e, n, r, i, s) {
        t.defaultRenderer || (t.defaultRenderer = this),
          (this.type = t.WEBGL_RENDERER),
          (this.transparent = !!i),
          (this.width = e || 800),
          (this.height = n || 600),
          (this.view = r || document.createElement("canvas")),
          (this.view.width = this.width),
          (this.view.height = this.height),
          (this.contextLost = this.handleContextLost.bind(this)),
          (this.contextRestoredLost = this.handleContextRestored.bind(this)),
          this.view.addEventListener("webglcontextlost", this.contextLost, !1),
          this.view.addEventListener(
            "webglcontextrestored",
            this.contextRestoredLost,
            !1
          ),
          (this.options = {
            alpha: this.transparent,
            antialias: !!s,
            premultipliedAlpha: !!i,
            stencil: !0,
          });
        try {
          this.gl = this.view.getContext("experimental-webgl", this.options);
        } catch (o) {
          try {
            this.gl = this.view.getContext("webgl", this.options);
          } catch (u) {
            throw new Error(
              " This browser does not support webGL. Try using the canvas renderer" +
                this
            );
          }
        }
        var a = this.gl;
        (this.glContextId = a.id = t.WebGLRenderer.glContextId++),
          (t.glContexts[this.glContextId] = a),
          t.blendModesWebGL ||
            ((t.blendModesWebGL = []),
            (t.blendModesWebGL[t.blendModes.NORMAL] = [
              a.ONE,
              a.ONE_MINUS_SRC_ALPHA,
            ]),
            (t.blendModesWebGL[t.blendModes.ADD] = [a.SRC_ALPHA, a.DST_ALPHA]),
            (t.blendModesWebGL[t.blendModes.MULTIPLY] = [
              a.DST_COLOR,
              a.ONE_MINUS_SRC_ALPHA,
            ]),
            (t.blendModesWebGL[t.blendModes.SCREEN] = [a.SRC_ALPHA, a.ONE]),
            (t.blendModesWebGL[t.blendModes.OVERLAY] = [
              a.ONE,
              a.ONE_MINUS_SRC_ALPHA,
            ]),
            (t.blendModesWebGL[t.blendModes.DARKEN] = [
              a.ONE,
              a.ONE_MINUS_SRC_ALPHA,
            ]),
            (t.blendModesWebGL[t.blendModes.LIGHTEN] = [
              a.ONE,
              a.ONE_MINUS_SRC_ALPHA,
            ]),
            (t.blendModesWebGL[t.blendModes.COLOR_DODGE] = [
              a.ONE,
              a.ONE_MINUS_SRC_ALPHA,
            ]),
            (t.blendModesWebGL[t.blendModes.COLOR_BURN] = [
              a.ONE,
              a.ONE_MINUS_SRC_ALPHA,
            ]),
            (t.blendModesWebGL[t.blendModes.HARD_LIGHT] = [
              a.ONE,
              a.ONE_MINUS_SRC_ALPHA,
            ]),
            (t.blendModesWebGL[t.blendModes.SOFT_LIGHT] = [
              a.ONE,
              a.ONE_MINUS_SRC_ALPHA,
            ]),
            (t.blendModesWebGL[t.blendModes.DIFFERENCE] = [
              a.ONE,
              a.ONE_MINUS_SRC_ALPHA,
            ]),
            (t.blendModesWebGL[t.blendModes.EXCLUSION] = [
              a.ONE,
              a.ONE_MINUS_SRC_ALPHA,
            ]),
            (t.blendModesWebGL[t.blendModes.HUE] = [
              a.ONE,
              a.ONE_MINUS_SRC_ALPHA,
            ]),
            (t.blendModesWebGL[t.blendModes.SATURATION] = [
              a.ONE,
              a.ONE_MINUS_SRC_ALPHA,
            ]),
            (t.blendModesWebGL[t.blendModes.COLOR] = [
              a.ONE,
              a.ONE_MINUS_SRC_ALPHA,
            ]),
            (t.blendModesWebGL[t.blendModes.LUMINOSITY] = [
              a.ONE,
              a.ONE_MINUS_SRC_ALPHA,
            ])),
          (this.projection = new t.Point()),
          (this.projection.x = this.width / 2),
          (this.projection.y = -this.height / 2),
          (this.offset = new t.Point(0, 0)),
          this.resize(this.width, this.height),
          (this.contextLost = !1),
          (this.shaderManager = new t.WebGLShaderManager(a)),
          (this.spriteBatch = new t.WebGLSpriteBatch(a)),
          (this.maskManager = new t.WebGLMaskManager(a)),
          (this.filterManager = new t.WebGLFilterManager(a, this.transparent)),
          (this.renderSession = {}),
          (this.renderSession.gl = this.gl),
          (this.renderSession.drawCount = 0),
          (this.renderSession.shaderManager = this.shaderManager),
          (this.renderSession.maskManager = this.maskManager),
          (this.renderSession.filterManager = this.filterManager),
          (this.renderSession.spriteBatch = this.spriteBatch),
          (this.renderSession.renderer = this),
          a.useProgram(this.shaderManager.defaultShader.program),
          a.disable(a.DEPTH_TEST),
          a.disable(a.CULL_FACE),
          a.enable(a.BLEND),
          a.colorMask(!0, !0, !0, this.transparent);
      }),
      (t.WebGLRenderer.prototype.constructor = t.WebGLRenderer),
      (t.WebGLRenderer.prototype.render = function (e) {
        if (!this.contextLost) {
          this.__stage !== e &&
            (e.interactive && e.interactionManager.removeEvents(),
            (this.__stage = e)),
            t.WebGLRenderer.updateTextures(),
            e.updateTransform(),
            e._interactive &&
              (e._interactiveEventsAdded ||
                ((e._interactiveEventsAdded = !0),
                e.interactionManager.setTarget(this)));
          var n = this.gl;
          n.viewport(0, 0, this.width, this.height),
            n.bindFramebuffer(n.FRAMEBUFFER, null),
            this.transparent
              ? n.clearColor(0, 0, 0, 0)
              : n.clearColor(
                  e.backgroundColorSplit[0],
                  e.backgroundColorSplit[1],
                  e.backgroundColorSplit[2],
                  1
                ),
            n.clear(n.COLOR_BUFFER_BIT),
            this.renderDisplayObject(e, this.projection),
            e.interactive
              ? e._interactiveEventsAdded ||
                ((e._interactiveEventsAdded = !0),
                e.interactionManager.setTarget(this))
              : e._interactiveEventsAdded &&
                ((e._interactiveEventsAdded = !1),
                e.interactionManager.setTarget(this));
        }
      }),
      (t.WebGLRenderer.prototype.renderDisplayObject = function (e, t, n) {
        (this.renderSession.drawCount = 0),
          (this.renderSession.currentBlendMode = 9999),
          (this.renderSession.projection = t),
          (this.renderSession.offset = this.offset),
          this.spriteBatch.begin(this.renderSession),
          this.filterManager.begin(this.renderSession, n),
          e._renderWebGL(this.renderSession),
          this.spriteBatch.end();
      }),
      (t.WebGLRenderer.updateTextures = function () {
        var e = 0;
        for (e = 0; e < t.Texture.frameUpdates.length; e++)
          t.WebGLRenderer.updateTextureFrame(t.Texture.frameUpdates[e]);
        for (e = 0; e < t.texturesToDestroy.length; e++)
          t.WebGLRenderer.destroyTexture(t.texturesToDestroy[e]);
        (t.texturesToUpdate.length = 0),
          (t.texturesToDestroy.length = 0),
          (t.Texture.frameUpdates.length = 0);
      }),
      (t.WebGLRenderer.destroyTexture = function (e) {
        for (var n = e._glTextures.length - 1; n >= 0; n--) {
          var r = e._glTextures[n],
            i = t.glContexts[n];
          i && r && i.deleteTexture(r);
        }
        e._glTextures.length = 0;
      }),
      (t.WebGLRenderer.updateTextureFrame = function (e) {
        (e.updateFrame = !1), e._updateWebGLuvs();
      }),
      (t.WebGLRenderer.prototype.resize = function (e, t) {
        (this.width = e),
          (this.height = t),
          (this.view.width = e),
          (this.view.height = t),
          this.gl.viewport(0, 0, this.width, this.height),
          (this.projection.x = this.width / 2),
          (this.projection.y = -this.height / 2);
      }),
      (t.createWebGLTexture = function (e, n) {
        return (
          e.hasLoaded &&
            ((e._glTextures[n.id] = n.createTexture()),
            n.bindTexture(n.TEXTURE_2D, e._glTextures[n.id]),
            n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0),
            n.texImage2D(
              n.TEXTURE_2D,
              0,
              n.RGBA,
              n.RGBA,
              n.UNSIGNED_BYTE,
              e.source
            ),
            n.texParameteri(
              n.TEXTURE_2D,
              n.TEXTURE_MAG_FILTER,
              e.scaleMode === t.scaleModes.LINEAR ? n.LINEAR : n.NEAREST
            ),
            n.texParameteri(
              n.TEXTURE_2D,
              n.TEXTURE_MIN_FILTER,
              e.scaleMode === t.scaleModes.LINEAR ? n.LINEAR : n.NEAREST
            ),
            e._powerOf2
              ? (n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, n.REPEAT),
                n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, n.REPEAT))
              : (n.texParameteri(
                  n.TEXTURE_2D,
                  n.TEXTURE_WRAP_S,
                  n.CLAMP_TO_EDGE
                ),
                n.texParameteri(
                  n.TEXTURE_2D,
                  n.TEXTURE_WRAP_T,
                  n.CLAMP_TO_EDGE
                )),
            n.bindTexture(n.TEXTURE_2D, null)),
          e._glTextures[n.id]
        );
      }),
      (t.updateWebGLTexture = function (e, n) {
        e._glTextures[n.id] &&
          (n.bindTexture(n.TEXTURE_2D, e._glTextures[n.id]),
          n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0),
          n.texImage2D(
            n.TEXTURE_2D,
            0,
            n.RGBA,
            n.RGBA,
            n.UNSIGNED_BYTE,
            e.source
          ),
          n.texParameteri(
            n.TEXTURE_2D,
            n.TEXTURE_MAG_FILTER,
            e.scaleMode === t.scaleModes.LINEAR ? n.LINEAR : n.NEAREST
          ),
          n.texParameteri(
            n.TEXTURE_2D,
            n.TEXTURE_MIN_FILTER,
            e.scaleMode === t.scaleModes.LINEAR ? n.LINEAR : n.NEAREST
          ),
          e._powerOf2
            ? (n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, n.REPEAT),
              n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, n.REPEAT))
            : (n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, n.CLAMP_TO_EDGE),
              n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, n.CLAMP_TO_EDGE)),
          n.bindTexture(n.TEXTURE_2D, null));
      }),
      (t.WebGLRenderer.prototype.handleContextLost = function (e) {
        e.preventDefault(), (this.contextLost = !0);
      }),
      (t.WebGLRenderer.prototype.handleContextRestored = function () {
        try {
          this.gl = this.view.getContext("experimental-webgl", this.options);
        } catch (e) {
          try {
            this.gl = this.view.getContext("webgl", this.options);
          } catch (n) {
            throw new Error(
              " This browser does not support webGL. Try using the canvas renderer" +
                this
            );
          }
        }
        var r = this.gl;
        (r.id = t.WebGLRenderer.glContextId++),
          this.shaderManager.setContext(r),
          this.spriteBatch.setContext(r),
          this.maskManager.setContext(r),
          this.filterManager.setContext(r),
          (this.renderSession.gl = this.gl),
          r.disable(r.DEPTH_TEST),
          r.disable(r.CULL_FACE),
          r.enable(r.BLEND),
          r.colorMask(!0, !0, !0, this.transparent),
          this.gl.viewport(0, 0, this.width, this.height);
        for (var i in t.TextureCache) {
          var s = t.TextureCache[i].baseTexture;
          s._glTextures = [];
        }
        this.contextLost = !1;
      }),
      (t.WebGLRenderer.prototype.destroy = function () {
        this.view.removeEventListener("webglcontextlost", this.contextLost),
          this.view.removeEventListener(
            "webglcontextrestored",
            this.contextRestoredLost
          ),
          (t.glContexts[this.glContextId] = null),
          (this.projection = null),
          (this.offset = null),
          this.shaderManager.destroy(),
          this.spriteBatch.destroy(),
          this.maskManager.destroy(),
          this.filterManager.destroy(),
          (this.shaderManager = null),
          (this.spriteBatch = null),
          (this.maskManager = null),
          (this.filterManager = null),
          (this.gl = null),
          (this.renderSession = null);
      }),
      (t.WebGLRenderer.glContextId = 0),
      (t.WebGLMaskManager = function (e) {
        (this.maskStack = []), (this.maskPosition = 0), this.setContext(e);
      }),
      (t.WebGLMaskManager.prototype.setContext = function (e) {
        this.gl = e;
      }),
      (t.WebGLMaskManager.prototype.pushMask = function (e, n) {
        var r = this.gl;
        0 === this.maskStack.length &&
          (r.enable(r.STENCIL_TEST), r.stencilFunc(r.ALWAYS, 1, 1)),
          this.maskStack.push(e),
          r.colorMask(!1, !1, !1, !0),
          r.stencilOp(r.KEEP, r.KEEP, r.INCR),
          t.WebGLGraphics.renderGraphics(e, n),
          r.colorMask(!0, !0, !0, !0),
          r.stencilFunc(r.NOTEQUAL, 0, this.maskStack.length),
          r.stencilOp(r.KEEP, r.KEEP, r.KEEP);
      }),
      (t.WebGLMaskManager.prototype.popMask = function (e) {
        var n = this.gl,
          r = this.maskStack.pop();
        r &&
          (n.colorMask(!1, !1, !1, !1),
          n.stencilOp(n.KEEP, n.KEEP, n.DECR),
          t.WebGLGraphics.renderGraphics(r, e),
          n.colorMask(!0, !0, !0, !0),
          n.stencilFunc(n.NOTEQUAL, 0, this.maskStack.length),
          n.stencilOp(n.KEEP, n.KEEP, n.KEEP)),
          0 === this.maskStack.length && n.disable(n.STENCIL_TEST);
      }),
      (t.WebGLMaskManager.prototype.destroy = function () {
        (this.maskStack = null), (this.gl = null);
      }),
      (t.WebGLShaderManager = function (e) {
        (this.maxAttibs = 10),
          (this.attribState = []),
          (this.tempAttribState = []);
        for (var t = 0; t < this.maxAttibs; t++) this.attribState[t] = !1;
        this.setContext(e);
      }),
      (t.WebGLShaderManager.prototype.setContext = function (e) {
        (this.gl = e),
          (this.primitiveShader = new t.PrimitiveShader(e)),
          (this.defaultShader = new t.PixiShader(e)),
          (this.fastShader = new t.PixiFastShader(e)),
          this.activateShader(this.defaultShader);
      }),
      (t.WebGLShaderManager.prototype.setAttribs = function (e) {
        var t;
        for (t = 0; t < this.tempAttribState.length; t++)
          this.tempAttribState[t] = !1;
        for (t = 0; t < e.length; t++) {
          var n = e[t];
          this.tempAttribState[n] = !0;
        }
        var r = this.gl;
        for (t = 0; t < this.attribState.length; t++)
          this.attribState[t] !== this.tempAttribState[t] &&
            ((this.attribState[t] = this.tempAttribState[t]),
            this.tempAttribState[t]
              ? r.enableVertexAttribArray(t)
              : r.disableVertexAttribArray(t));
      }),
      (t.WebGLShaderManager.prototype.activateShader = function (e) {
        (this.currentShader = e),
          this.gl.useProgram(e.program),
          this.setAttribs(e.attributes);
      }),
      (t.WebGLShaderManager.prototype.activatePrimitiveShader = function () {
        var e = this.gl;
        e.useProgram(this.primitiveShader.program),
          this.setAttribs(this.primitiveShader.attributes);
      }),
      (t.WebGLShaderManager.prototype.deactivatePrimitiveShader = function () {
        var e = this.gl;
        e.useProgram(this.defaultShader.program),
          this.setAttribs(this.defaultShader.attributes);
      }),
      (t.WebGLShaderManager.prototype.destroy = function () {
        (this.attribState = null),
          (this.tempAttribState = null),
          this.primitiveShader.destroy(),
          this.defaultShader.destroy(),
          this.fastShader.destroy(),
          (this.gl = null);
      }),
      (t.WebGLSpriteBatch = function (e) {
        (this.vertSize = 6), (this.size = 2e3);
        var t = 4 * this.size * this.vertSize,
          n = 6 * this.size;
        (this.vertices = new Float32Array(t)),
          (this.indices = new Uint16Array(n)),
          (this.lastIndexCount = 0);
        for (var r = 0, i = 0; n > r; r += 6, i += 4)
          (this.indices[r + 0] = i + 0),
            (this.indices[r + 1] = i + 1),
            (this.indices[r + 2] = i + 2),
            (this.indices[r + 3] = i + 0),
            (this.indices[r + 4] = i + 2),
            (this.indices[r + 5] = i + 3);
        (this.drawing = !1),
          (this.currentBatchSize = 0),
          (this.currentBaseTexture = null),
          this.setContext(e);
      }),
      (t.WebGLSpriteBatch.prototype.setContext = function (e) {
        (this.gl = e),
          (this.vertexBuffer = e.createBuffer()),
          (this.indexBuffer = e.createBuffer()),
          e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, this.indexBuffer),
          e.bufferData(e.ELEMENT_ARRAY_BUFFER, this.indices, e.STATIC_DRAW),
          e.bindBuffer(e.ARRAY_BUFFER, this.vertexBuffer),
          e.bufferData(e.ARRAY_BUFFER, this.vertices, e.DYNAMIC_DRAW),
          (this.currentBlendMode = 99999);
      }),
      (t.WebGLSpriteBatch.prototype.begin = function (e) {
        (this.renderSession = e),
          (this.shader = this.renderSession.shaderManager.defaultShader),
          this.start();
      }),
      (t.WebGLSpriteBatch.prototype.end = function () {
        this.flush();
      }),
      (t.WebGLSpriteBatch.prototype.render = function (e) {
        var t = e.texture;
        (t.baseTexture !== this.currentBaseTexture ||
          this.currentBatchSize >= this.size) &&
          (this.flush(), (this.currentBaseTexture = t.baseTexture)),
          e.blendMode !== this.currentBlendMode &&
            this.setBlendMode(e.blendMode);
        var n = e._uvs || e.texture._uvs;
        if (n) {
          var r,
            i,
            s,
            o,
            u = e.worldAlpha,
            a = e.tint,
            f = this.vertices,
            l = e.anchor.x,
            c = e.anchor.y;
          if (e.texture.trim) {
            var h = e.texture.trim;
            (i = h.x - l * h.width),
              (r = i + t.frame.width),
              (o = h.y - c * h.height),
              (s = o + t.frame.height);
          } else
            (r = t.frame.width * (1 - l)),
              (i = t.frame.width * -l),
              (s = t.frame.height * (1 - c)),
              (o = t.frame.height * -c);
          var p = 4 * this.currentBatchSize * this.vertSize,
            d = e.worldTransform,
            v = d.a,
            m = d.c,
            g = d.b,
            y = d.d,
            b = d.tx,
            w = d.ty;
          (f[p++] = v * i + g * o + b),
            (f[p++] = y * o + m * i + w),
            (f[p++] = n.x0),
            (f[p++] = n.y0),
            (f[p++] = u),
            (f[p++] = a),
            (f[p++] = v * r + g * o + b),
            (f[p++] = y * o + m * r + w),
            (f[p++] = n.x1),
            (f[p++] = n.y1),
            (f[p++] = u),
            (f[p++] = a),
            (f[p++] = v * r + g * s + b),
            (f[p++] = y * s + m * r + w),
            (f[p++] = n.x2),
            (f[p++] = n.y2),
            (f[p++] = u),
            (f[p++] = a),
            (f[p++] = v * i + g * s + b),
            (f[p++] = y * s + m * i + w),
            (f[p++] = n.x3),
            (f[p++] = n.y3),
            (f[p++] = u),
            (f[p++] = a),
            this.currentBatchSize++;
        }
      }),
      (t.WebGLSpriteBatch.prototype.renderTilingSprite = function (e) {
        var n = e.tilingTexture;
        (n.baseTexture !== this.currentBaseTexture ||
          this.currentBatchSize >= this.size) &&
          (this.flush(), (this.currentBaseTexture = n.baseTexture)),
          e.blendMode !== this.currentBlendMode &&
            this.setBlendMode(e.blendMode),
          e._uvs || (e._uvs = new t.TextureUvs());
        var r = e._uvs;
        (e.tilePosition.x %= n.baseTexture.width * e.tileScaleOffset.x),
          (e.tilePosition.y %= n.baseTexture.height * e.tileScaleOffset.y);
        var i = e.tilePosition.x / (n.baseTexture.width * e.tileScaleOffset.x),
          s = e.tilePosition.y / (n.baseTexture.height * e.tileScaleOffset.y),
          o =
            e.width /
            n.baseTexture.width /
            (e.tileScale.x * e.tileScaleOffset.x),
          u =
            e.height /
            n.baseTexture.height /
            (e.tileScale.y * e.tileScaleOffset.y);
        (r.x0 = 0 - i),
          (r.y0 = 0 - s),
          (r.x1 = 1 * o - i),
          (r.y1 = 0 - s),
          (r.x2 = 1 * o - i),
          (r.y2 = 1 * u - s),
          (r.x3 = 0 - i),
          (r.y3 = 1 * u - s);
        var a = e.worldAlpha,
          f = e.tint,
          l = this.vertices,
          c = e.width,
          h = e.height,
          p = e.anchor.x,
          d = e.anchor.y,
          v = c * (1 - p),
          m = c * -p,
          g = h * (1 - d),
          y = h * -d,
          w = 4 * this.currentBatchSize * this.vertSize,
          E = e.worldTransform,
          S = E.a,
          x = E.c,
          T = E.b,
          N = E.d,
          C = E.tx,
          k = E.ty;
        (l[w++] = S * m + T * y + C),
          (l[w++] = N * y + x * m + k),
          (l[w++] = r.x0),
          (l[w++] = r.y0),
          (l[w++] = a),
          (l[w++] = f),
          (l[w++] = S * v + T * y + C),
          (l[w++] = N * y + x * v + k),
          (l[w++] = r.x1),
          (l[w++] = r.y1),
          (l[w++] = a),
          (l[w++] = f),
          (l[w++] = S * v + T * g + C),
          (l[w++] = N * g + x * v + k),
          (l[w++] = r.x2),
          (l[w++] = r.y2),
          (l[w++] = a),
          (l[w++] = f),
          (l[w++] = S * m + T * g + C),
          (l[w++] = N * g + x * m + k),
          (l[w++] = r.x3),
          (l[w++] = r.y3),
          (l[w++] = a),
          (l[w++] = f),
          this.currentBatchSize++;
      }),
      (t.WebGLSpriteBatch.prototype.flush = function () {
        if (0 !== this.currentBatchSize) {
          var e = this.gl;
          if (
            (e.bindTexture(
              e.TEXTURE_2D,
              this.currentBaseTexture._glTextures[e.id] ||
                t.createWebGLTexture(this.currentBaseTexture, e)
            ),
            this.currentBatchSize > 0.5 * this.size)
          )
            e.bufferSubData(e.ARRAY_BUFFER, 0, this.vertices);
          else {
            var n = this.vertices.subarray(
              0,
              4 * this.currentBatchSize * this.vertSize
            );
            e.bufferSubData(e.ARRAY_BUFFER, 0, n);
          }
          e.drawElements(
            e.TRIANGLES,
            6 * this.currentBatchSize,
            e.UNSIGNED_SHORT,
            0
          ),
            (this.currentBatchSize = 0),
            this.renderSession.drawCount++;
        }
      }),
      (t.WebGLSpriteBatch.prototype.stop = function () {
        this.flush();
      }),
      (t.WebGLSpriteBatch.prototype.start = function () {
        var e = this.gl;
        e.activeTexture(e.TEXTURE0),
          e.bindBuffer(e.ARRAY_BUFFER, this.vertexBuffer),
          e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        var n = this.renderSession.projection;
        e.uniform2f(this.shader.projectionVector, n.x, n.y);
        var r = 4 * this.vertSize;
        e.vertexAttribPointer(
          this.shader.aVertexPosition,
          2,
          e.FLOAT,
          !1,
          r,
          0
        ),
          e.vertexAttribPointer(
            this.shader.aTextureCoord,
            2,
            e.FLOAT,
            !1,
            r,
            8
          ),
          e.vertexAttribPointer(
            this.shader.colorAttribute,
            2,
            e.FLOAT,
            !1,
            r,
            16
          ),
          this.currentBlendMode !== t.blendModes.NORMAL &&
            this.setBlendMode(t.blendModes.NORMAL);
      }),
      (t.WebGLSpriteBatch.prototype.setBlendMode = function (e) {
        this.flush(), (this.currentBlendMode = e);
        var n = t.blendModesWebGL[this.currentBlendMode];
        this.gl.blendFunc(n[0], n[1]);
      }),
      (t.WebGLSpriteBatch.prototype.destroy = function () {
        (this.vertices = null),
          (this.indices = null),
          this.gl.deleteBuffer(this.vertexBuffer),
          this.gl.deleteBuffer(this.indexBuffer),
          (this.currentBaseTexture = null),
          (this.gl = null);
      }),
      (t.WebGLFastSpriteBatch = function (e) {
        (this.vertSize = 10), (this.maxSize = 6e3), (this.size = this.maxSize);
        var t = 4 * this.size * this.vertSize,
          n = 6 * this.maxSize;
        (this.vertices = new Float32Array(t)),
          (this.indices = new Uint16Array(n)),
          (this.vertexBuffer = null),
          (this.indexBuffer = null),
          (this.lastIndexCount = 0);
        for (var r = 0, i = 0; n > r; r += 6, i += 4)
          (this.indices[r + 0] = i + 0),
            (this.indices[r + 1] = i + 1),
            (this.indices[r + 2] = i + 2),
            (this.indices[r + 3] = i + 0),
            (this.indices[r + 4] = i + 2),
            (this.indices[r + 5] = i + 3);
        (this.drawing = !1),
          (this.currentBatchSize = 0),
          (this.currentBaseTexture = null),
          (this.currentBlendMode = 0),
          (this.renderSession = null),
          (this.shader = null),
          (this.matrix = null),
          this.setContext(e);
      }),
      (t.WebGLFastSpriteBatch.prototype.setContext = function (e) {
        (this.gl = e),
          (this.vertexBuffer = e.createBuffer()),
          (this.indexBuffer = e.createBuffer()),
          e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, this.indexBuffer),
          e.bufferData(e.ELEMENT_ARRAY_BUFFER, this.indices, e.STATIC_DRAW),
          e.bindBuffer(e.ARRAY_BUFFER, this.vertexBuffer),
          e.bufferData(e.ARRAY_BUFFER, this.vertices, e.DYNAMIC_DRAW),
          (this.currentBlendMode = 99999);
      }),
      (t.WebGLFastSpriteBatch.prototype.begin = function (e, t) {
        (this.renderSession = t),
          (this.shader = this.renderSession.shaderManager.fastShader),
          (this.matrix = e.worldTransform.toArray(!0)),
          this.start();
      }),
      (t.WebGLFastSpriteBatch.prototype.end = function () {
        this.flush();
      }),
      (t.WebGLFastSpriteBatch.prototype.render = function (e) {
        var t = e.children,
          n = t[0];
        if (n.texture._uvs) {
          (this.currentBaseTexture = n.texture.baseTexture),
            n.blendMode !== this.currentBlendMode &&
              this.setBlendMode(n.blendMode);
          for (var r = 0, i = t.length; i > r; r++) this.renderSprite(t[r]);
          this.flush();
        }
      }),
      (t.WebGLFastSpriteBatch.prototype.renderSprite = function (e) {
        if (
          e.visible &&
          (e.texture.baseTexture === this.currentBaseTexture ||
            (this.flush(),
            (this.currentBaseTexture = e.texture.baseTexture),
            e.texture._uvs))
        ) {
          var t,
            n,
            r,
            i,
            s,
            o,
            u,
            a,
            f = this.vertices;
          if (
            ((t = e.texture._uvs),
            (n = e.texture.frame.width),
            (r = e.texture.frame.height),
            e.texture.trim)
          ) {
            var l = e.texture.trim;
            (s = l.x - e.anchor.x * l.width),
              (i = s + e.texture.frame.width),
              (u = l.y - e.anchor.y * l.height),
              (o = u + e.texture.frame.height);
          } else
            (i = e.texture.frame.width * (1 - e.anchor.x)),
              (s = e.texture.frame.width * -e.anchor.x),
              (o = e.texture.frame.height * (1 - e.anchor.y)),
              (u = e.texture.frame.height * -e.anchor.y);
          (a = 4 * this.currentBatchSize * this.vertSize),
            (f[a++] = s),
            (f[a++] = u),
            (f[a++] = e.position.x),
            (f[a++] = e.position.y),
            (f[a++] = e.scale.x),
            (f[a++] = e.scale.y),
            (f[a++] = e.rotation),
            (f[a++] = t.x0),
            (f[a++] = t.y1),
            (f[a++] = e.alpha),
            (f[a++] = i),
            (f[a++] = u),
            (f[a++] = e.position.x),
            (f[a++] = e.position.y),
            (f[a++] = e.scale.x),
            (f[a++] = e.scale.y),
            (f[a++] = e.rotation),
            (f[a++] = t.x1),
            (f[a++] = t.y1),
            (f[a++] = e.alpha),
            (f[a++] = i),
            (f[a++] = o),
            (f[a++] = e.position.x),
            (f[a++] = e.position.y),
            (f[a++] = e.scale.x),
            (f[a++] = e.scale.y),
            (f[a++] = e.rotation),
            (f[a++] = t.x2),
            (f[a++] = t.y2),
            (f[a++] = e.alpha),
            (f[a++] = s),
            (f[a++] = o),
            (f[a++] = e.position.x),
            (f[a++] = e.position.y),
            (f[a++] = e.scale.x),
            (f[a++] = e.scale.y),
            (f[a++] = e.rotation),
            (f[a++] = t.x3),
            (f[a++] = t.y3),
            (f[a++] = e.alpha),
            this.currentBatchSize++,
            this.currentBatchSize >= this.size && this.flush();
        }
      }),
      (t.WebGLFastSpriteBatch.prototype.flush = function () {
        if (0 !== this.currentBatchSize) {
          var e = this.gl;
          if (
            (this.currentBaseTexture._glTextures[e.id] ||
              t.createWebGLTexture(this.currentBaseTexture, e),
            e.bindTexture(
              e.TEXTURE_2D,
              this.currentBaseTexture._glTextures[e.id]
            ),
            this.currentBatchSize > 0.5 * this.size)
          )
            e.bufferSubData(e.ARRAY_BUFFER, 0, this.vertices);
          else {
            var n = this.vertices.subarray(
              0,
              4 * this.currentBatchSize * this.vertSize
            );
            e.bufferSubData(e.ARRAY_BUFFER, 0, n);
          }
          e.drawElements(
            e.TRIANGLES,
            6 * this.currentBatchSize,
            e.UNSIGNED_SHORT,
            0
          ),
            (this.currentBatchSize = 0),
            this.renderSession.drawCount++;
        }
      }),
      (t.WebGLFastSpriteBatch.prototype.stop = function () {
        this.flush();
      }),
      (t.WebGLFastSpriteBatch.prototype.start = function () {
        var e = this.gl;
        e.activeTexture(e.TEXTURE0),
          e.bindBuffer(e.ARRAY_BUFFER, this.vertexBuffer),
          e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        var n = this.renderSession.projection;
        e.uniform2f(this.shader.projectionVector, n.x, n.y),
          e.uniformMatrix3fv(this.shader.uMatrix, !1, this.matrix);
        var r = 4 * this.vertSize;
        e.vertexAttribPointer(
          this.shader.aVertexPosition,
          2,
          e.FLOAT,
          !1,
          r,
          0
        ),
          e.vertexAttribPointer(
            this.shader.aPositionCoord,
            2,
            e.FLOAT,
            !1,
            r,
            8
          ),
          e.vertexAttribPointer(this.shader.aScale, 2, e.FLOAT, !1, r, 16),
          e.vertexAttribPointer(this.shader.aRotation, 1, e.FLOAT, !1, r, 24),
          e.vertexAttribPointer(
            this.shader.aTextureCoord,
            2,
            e.FLOAT,
            !1,
            r,
            28
          ),
          e.vertexAttribPointer(
            this.shader.colorAttribute,
            1,
            e.FLOAT,
            !1,
            r,
            36
          ),
          this.currentBlendMode !== t.blendModes.NORMAL &&
            this.setBlendMode(t.blendModes.NORMAL);
      }),
      (t.WebGLFastSpriteBatch.prototype.setBlendMode = function (e) {
        this.flush(), (this.currentBlendMode = e);
        var n = t.blendModesWebGL[this.currentBlendMode];
        this.gl.blendFunc(n[0], n[1]);
      }),
      (t.WebGLFilterManager = function (e, t) {
        (this.transparent = t),
          (this.filterStack = []),
          (this.offsetX = 0),
          (this.offsetY = 0),
          this.setContext(e);
      }),
      (t.WebGLFilterManager.prototype.setContext = function (e) {
        (this.gl = e), (this.texturePool = []), this.initShaderBuffers();
      }),
      (t.WebGLFilterManager.prototype.begin = function (e, t) {
        (this.renderSession = e),
          (this.defaultShader = e.shaderManager.defaultShader);
        var n = this.renderSession.projection;
        (this.width = 2 * n.x), (this.height = 2 * -n.y), (this.buffer = t);
      }),
      (t.WebGLFilterManager.prototype.pushFilter = function (e) {
        var n = this.gl,
          r = this.renderSession.projection,
          i = this.renderSession.offset;
        this.filterStack.push(e);
        var s = e.filterPasses[0];
        (this.offsetX += e.target.filterArea.x),
          (this.offsetY += e.target.filterArea.y);
        var o = this.texturePool.pop();
        o
          ? o.resize(this.width, this.height)
          : (o = new t.FilterTexture(this.gl, this.width, this.height)),
          n.bindTexture(n.TEXTURE_2D, o.texture),
          (e.target.filterArea = e.target.getBounds());
        var u = e.target.filterArea,
          a = s.padding;
        (u.x -= a),
          (u.y -= a),
          (u.width += 2 * a),
          (u.height += 2 * a),
          u.x < 0 && (u.x = 0),
          u.width > this.width && (u.width = this.width),
          u.y < 0 && (u.y = 0),
          u.height > this.height && (u.height = this.height),
          n.bindFramebuffer(n.FRAMEBUFFER, o.frameBuffer),
          n.viewport(0, 0, u.width, u.height),
          (r.x = u.width / 2),
          (r.y = -u.height / 2),
          (i.x = -u.x),
          (i.y = -u.y),
          n.uniform2f(
            this.defaultShader.projectionVector,
            u.width / 2,
            -u.height / 2
          ),
          n.uniform2f(this.defaultShader.offsetVector, -u.x, -u.y),
          n.colorMask(!0, !0, !0, !0),
          n.clearColor(0, 0, 0, 0),
          n.clear(n.COLOR_BUFFER_BIT),
          (e._glFilterTexture = o);
      }),
      (t.WebGLFilterManager.prototype.popFilter = function () {
        var e = this.gl,
          n = this.filterStack.pop(),
          r = n.target.filterArea,
          i = n._glFilterTexture,
          s = this.renderSession.projection,
          o = this.renderSession.offset;
        if (n.filterPasses.length > 1) {
          e.viewport(0, 0, r.width, r.height),
            e.bindBuffer(e.ARRAY_BUFFER, this.vertexBuffer),
            (this.vertexArray[0] = 0),
            (this.vertexArray[1] = r.height),
            (this.vertexArray[2] = r.width),
            (this.vertexArray[3] = r.height),
            (this.vertexArray[4] = 0),
            (this.vertexArray[5] = 0),
            (this.vertexArray[6] = r.width),
            (this.vertexArray[7] = 0),
            e.bufferSubData(e.ARRAY_BUFFER, 0, this.vertexArray),
            e.bindBuffer(e.ARRAY_BUFFER, this.uvBuffer),
            (this.uvArray[2] = r.width / this.width),
            (this.uvArray[5] = r.height / this.height),
            (this.uvArray[6] = r.width / this.width),
            (this.uvArray[7] = r.height / this.height),
            e.bufferSubData(e.ARRAY_BUFFER, 0, this.uvArray);
          var u = i,
            a = this.texturePool.pop();
          a || (a = new t.FilterTexture(this.gl, this.width, this.height)),
            a.resize(this.width, this.height),
            e.bindFramebuffer(e.FRAMEBUFFER, a.frameBuffer),
            e.clear(e.COLOR_BUFFER_BIT),
            e.disable(e.BLEND);
          for (var f = 0; f < n.filterPasses.length - 1; f++) {
            var l = n.filterPasses[f];
            e.bindFramebuffer(e.FRAMEBUFFER, a.frameBuffer),
              e.activeTexture(e.TEXTURE0),
              e.bindTexture(e.TEXTURE_2D, u.texture),
              this.applyFilterPass(l, r, r.width, r.height);
            var c = u;
            (u = a), (a = c);
          }
          e.enable(e.BLEND), (i = u), this.texturePool.push(a);
        }
        var h = n.filterPasses[n.filterPasses.length - 1];
        (this.offsetX -= r.x), (this.offsetY -= r.y);
        var p = this.width,
          d = this.height,
          v = 0,
          m = 0,
          g = this.buffer;
        if (0 === this.filterStack.length) e.colorMask(!0, !0, !0, !0);
        else {
          var y = this.filterStack[this.filterStack.length - 1];
          (r = y.target.filterArea),
            (p = r.width),
            (d = r.height),
            (v = r.x),
            (m = r.y),
            (g = y._glFilterTexture.frameBuffer);
        }
        (s.x = p / 2),
          (s.y = -d / 2),
          (o.x = v),
          (o.y = m),
          (r = n.target.filterArea);
        var w = r.x - v,
          E = r.y - m;
        e.bindBuffer(e.ARRAY_BUFFER, this.vertexBuffer),
          (this.vertexArray[0] = w),
          (this.vertexArray[1] = E + r.height),
          (this.vertexArray[2] = w + r.width),
          (this.vertexArray[3] = E + r.height),
          (this.vertexArray[4] = w),
          (this.vertexArray[5] = E),
          (this.vertexArray[6] = w + r.width),
          (this.vertexArray[7] = E),
          e.bufferSubData(e.ARRAY_BUFFER, 0, this.vertexArray),
          e.bindBuffer(e.ARRAY_BUFFER, this.uvBuffer),
          (this.uvArray[2] = r.width / this.width),
          (this.uvArray[5] = r.height / this.height),
          (this.uvArray[6] = r.width / this.width),
          (this.uvArray[7] = r.height / this.height),
          e.bufferSubData(e.ARRAY_BUFFER, 0, this.uvArray),
          e.viewport(0, 0, p, d),
          e.bindFramebuffer(e.FRAMEBUFFER, g),
          e.activeTexture(e.TEXTURE0),
          e.bindTexture(e.TEXTURE_2D, i.texture),
          this.applyFilterPass(h, r, p, d),
          e.useProgram(this.defaultShader.program),
          e.uniform2f(this.defaultShader.projectionVector, p / 2, -d / 2),
          e.uniform2f(this.defaultShader.offsetVector, -v, -m),
          this.texturePool.push(i),
          (n._glFilterTexture = null);
      }),
      (t.WebGLFilterManager.prototype.applyFilterPass = function (e, n, r, i) {
        var s = this.gl,
          o = e.shaders[s.id];
        o ||
          ((o = new t.PixiShader(s)),
          (o.fragmentSrc = e.fragmentSrc),
          (o.uniforms = e.uniforms),
          o.init(),
          (e.shaders[s.id] = o)),
          s.useProgram(o.program),
          s.uniform2f(o.projectionVector, r / 2, -i / 2),
          s.uniform2f(o.offsetVector, 0, 0),
          e.uniforms.dimensions &&
            ((e.uniforms.dimensions.value[0] = this.width),
            (e.uniforms.dimensions.value[1] = this.height),
            (e.uniforms.dimensions.value[2] = this.vertexArray[0]),
            (e.uniforms.dimensions.value[3] = this.vertexArray[5])),
          o.syncUniforms(),
          s.bindBuffer(s.ARRAY_BUFFER, this.vertexBuffer),
          s.vertexAttribPointer(o.aVertexPosition, 2, s.FLOAT, !1, 0, 0),
          s.bindBuffer(s.ARRAY_BUFFER, this.uvBuffer),
          s.vertexAttribPointer(o.aTextureCoord, 2, s.FLOAT, !1, 0, 0),
          s.bindBuffer(s.ARRAY_BUFFER, this.colorBuffer),
          s.vertexAttribPointer(o.colorAttribute, 2, s.FLOAT, !1, 0, 0),
          s.bindBuffer(s.ELEMENT_ARRAY_BUFFER, this.indexBuffer),
          s.drawElements(s.TRIANGLES, 6, s.UNSIGNED_SHORT, 0),
          this.renderSession.drawCount++;
      }),
      (t.WebGLFilterManager.prototype.initShaderBuffers = function () {
        var e = this.gl;
        (this.vertexBuffer = e.createBuffer()),
          (this.uvBuffer = e.createBuffer()),
          (this.colorBuffer = e.createBuffer()),
          (this.indexBuffer = e.createBuffer()),
          (this.vertexArray = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1])),
          e.bindBuffer(e.ARRAY_BUFFER, this.vertexBuffer),
          e.bufferData(e.ARRAY_BUFFER, this.vertexArray, e.STATIC_DRAW),
          (this.uvArray = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1])),
          e.bindBuffer(e.ARRAY_BUFFER, this.uvBuffer),
          e.bufferData(e.ARRAY_BUFFER, this.uvArray, e.STATIC_DRAW),
          (this.colorArray = new Float32Array([
            1, 16777215, 1, 16777215, 1, 16777215, 1, 16777215,
          ])),
          e.bindBuffer(e.ARRAY_BUFFER, this.colorBuffer),
          e.bufferData(e.ARRAY_BUFFER, this.colorArray, e.STATIC_DRAW),
          e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, this.indexBuffer),
          e.bufferData(
            e.ELEMENT_ARRAY_BUFFER,
            new Uint16Array([0, 1, 2, 1, 3, 2]),
            e.STATIC_DRAW
          );
      }),
      (t.WebGLFilterManager.prototype.destroy = function () {
        var e = this.gl;
        (this.filterStack = null), (this.offsetX = 0), (this.offsetY = 0);
        for (var t = 0; t < this.texturePool.length; t++)
          this.texturePool.destroy();
        (this.texturePool = null),
          e.deleteBuffer(this.vertexBuffer),
          e.deleteBuffer(this.uvBuffer),
          e.deleteBuffer(this.colorBuffer),
          e.deleteBuffer(this.indexBuffer);
      }),
      (t.FilterTexture = function (e, t, n) {
        (this.gl = e),
          (this.frameBuffer = e.createFramebuffer()),
          (this.texture = e.createTexture()),
          e.bindTexture(e.TEXTURE_2D, this.texture),
          e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR),
          e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR),
          e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE),
          e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE),
          e.bindFramebuffer(e.FRAMEBUFFER, this.framebuffer),
          e.bindFramebuffer(e.FRAMEBUFFER, this.frameBuffer),
          e.framebufferTexture2D(
            e.FRAMEBUFFER,
            e.COLOR_ATTACHMENT0,
            e.TEXTURE_2D,
            this.texture,
            0
          ),
          this.resize(t, n);
      }),
      (t.FilterTexture.prototype.clear = function () {
        var e = this.gl;
        e.clearColor(0, 0, 0, 0), e.clear(e.COLOR_BUFFER_BIT);
      }),
      (t.FilterTexture.prototype.resize = function (e, t) {
        if (this.width !== e || this.height !== t) {
          (this.width = e), (this.height = t);
          var n = this.gl;
          n.bindTexture(n.TEXTURE_2D, this.texture),
            n.texImage2D(
              n.TEXTURE_2D,
              0,
              n.RGBA,
              e,
              t,
              0,
              n.RGBA,
              n.UNSIGNED_BYTE,
              null
            );
        }
      }),
      (t.FilterTexture.prototype.destroy = function () {
        var e = this.gl;
        e.deleteFramebuffer(this.frameBuffer),
          e.deleteTexture(this.texture),
          (this.frameBuffer = null),
          (this.texture = null);
      }),
      (t.CanvasMaskManager = function () {}),
      (t.CanvasMaskManager.prototype.pushMask = function (e, n) {
        n.save();
        var r = e.alpha,
          i = e.worldTransform;
        n.setTransform(i.a, i.c, i.b, i.d, i.tx, i.ty),
          t.CanvasGraphics.renderGraphicsMask(e, n),
          n.clip(),
          (e.worldAlpha = r);
      }),
      (t.CanvasMaskManager.prototype.popMask = function (e) {
        e.restore();
      }),
      (t.CanvasTinter = function () {}),
      (t.CanvasTinter.getTintedTexture = function (e, n) {
        var r = e.texture;
        n = t.CanvasTinter.roundColor(n);
        var i = "#" + ("00000" + (0 | n).toString(16)).substr(-6);
        if (((r.tintCache = r.tintCache || {}), r.tintCache[i]))
          return r.tintCache[i];
        var s = t.CanvasTinter.canvas || document.createElement("canvas");
        if (
          (t.CanvasTinter.tintMethod(r, n, s),
          t.CanvasTinter.convertTintToImage)
        ) {
          var o = new Image();
          (o.src = s.toDataURL()), (r.tintCache[i] = o);
        } else (r.tintCache[i] = s), (t.CanvasTinter.canvas = null);
        return s;
      }),
      (t.CanvasTinter.tintWithMultiply = function (e, t, n) {
        var r = n.getContext("2d"),
          i = e.frame;
        (n.width = i.width),
          (n.height = i.height),
          (r.fillStyle = "#" + ("00000" + (0 | t).toString(16)).substr(-6)),
          r.fillRect(0, 0, i.width, i.height),
          (r.globalCompositeOperation = "multiply"),
          r.drawImage(
            e.baseTexture.source,
            i.x,
            i.y,
            i.width,
            i.height,
            0,
            0,
            i.width,
            i.height
          ),
          (r.globalCompositeOperation = "destination-atop"),
          r.drawImage(
            e.baseTexture.source,
            i.x,
            i.y,
            i.width,
            i.height,
            0,
            0,
            i.width,
            i.height
          );
      }),
      (t.CanvasTinter.tintWithOverlay = function (e, t, n) {
        var r = n.getContext("2d"),
          i = e.frame;
        (n.width = i.width),
          (n.height = i.height),
          (r.globalCompositeOperation = "copy"),
          (r.fillStyle = "#" + ("00000" + (0 | t).toString(16)).substr(-6)),
          r.fillRect(0, 0, i.width, i.height),
          (r.globalCompositeOperation = "destination-atop"),
          r.drawImage(
            e.baseTexture.source,
            i.x,
            i.y,
            i.width,
            i.height,
            0,
            0,
            i.width,
            i.height
          );
      }),
      (t.CanvasTinter.tintWithPerPixel = function (e, n, r) {
        var i = r.getContext("2d"),
          s = e.frame;
        (r.width = s.width),
          (r.height = s.height),
          (i.globalCompositeOperation = "copy"),
          i.drawImage(
            e.baseTexture.source,
            s.x,
            s.y,
            s.width,
            s.height,
            0,
            0,
            s.width,
            s.height
          );
        for (
          var o = t.hex2rgb(n),
            u = o[0],
            a = o[1],
            f = o[2],
            l = i.getImageData(0, 0, s.width, s.height),
            c = l.data,
            h = 0;
          h < c.length;
          h += 4
        )
          (c[h + 0] *= u), (c[h + 1] *= a), (c[h + 2] *= f);
        i.putImageData(l, 0, 0);
      }),
      (t.CanvasTinter.roundColor = function (e) {
        var n = t.CanvasTinter.cacheStepsPerColorChannel,
          r = t.hex2rgb(e);
        return (
          (r[0] = Math.min(255, (r[0] / n) * n)),
          (r[1] = Math.min(255, (r[1] / n) * n)),
          (r[2] = Math.min(255, (r[2] / n) * n)),
          t.rgb2hex(r)
        );
      }),
      (t.CanvasTinter.cacheStepsPerColorChannel = 8),
      (t.CanvasTinter.convertTintToImage = !1),
      (t.CanvasTinter.canUseMultiply = t.canUseNewCanvasBlendModes()),
      (t.CanvasTinter.tintMethod = t.CanvasTinter.canUseMultiply
        ? t.CanvasTinter.tintWithMultiply
        : t.CanvasTinter.tintWithPerPixel),
      (t.CanvasRenderer = function (e, n, r, i) {
        (t.defaultRenderer = t.defaultRenderer || this),
          (this.type = t.CANVAS_RENDERER),
          (this.clearBeforeRender = !0),
          (this.roundPixels = !1),
          (this.transparent = !!i),
          t.blendModesCanvas ||
            ((t.blendModesCanvas = []),
            t.canUseNewCanvasBlendModes()
              ? ((t.blendModesCanvas[t.blendModes.NORMAL] = "source-over"),
                (t.blendModesCanvas[t.blendModes.ADD] = "lighter"),
                (t.blendModesCanvas[t.blendModes.MULTIPLY] = "multiply"),
                (t.blendModesCanvas[t.blendModes.SCREEN] = "screen"),
                (t.blendModesCanvas[t.blendModes.OVERLAY] = "overlay"),
                (t.blendModesCanvas[t.blendModes.DARKEN] = "darken"),
                (t.blendModesCanvas[t.blendModes.LIGHTEN] = "lighten"),
                (t.blendModesCanvas[t.blendModes.COLOR_DODGE] = "color-dodge"),
                (t.blendModesCanvas[t.blendModes.COLOR_BURN] = "color-burn"),
                (t.blendModesCanvas[t.blendModes.HARD_LIGHT] = "hard-light"),
                (t.blendModesCanvas[t.blendModes.SOFT_LIGHT] = "soft-light"),
                (t.blendModesCanvas[t.blendModes.DIFFERENCE] = "difference"),
                (t.blendModesCanvas[t.blendModes.EXCLUSION] = "exclusion"),
                (t.blendModesCanvas[t.blendModes.HUE] = "hue"),
                (t.blendModesCanvas[t.blendModes.SATURATION] = "saturation"),
                (t.blendModesCanvas[t.blendModes.COLOR] = "color"),
                (t.blendModesCanvas[t.blendModes.LUMINOSITY] = "luminosity"))
              : ((t.blendModesCanvas[t.blendModes.NORMAL] = "source-over"),
                (t.blendModesCanvas[t.blendModes.ADD] = "lighter"),
                (t.blendModesCanvas[t.blendModes.MULTIPLY] = "source-over"),
                (t.blendModesCanvas[t.blendModes.SCREEN] = "source-over"),
                (t.blendModesCanvas[t.blendModes.OVERLAY] = "source-over"),
                (t.blendModesCanvas[t.blendModes.DARKEN] = "source-over"),
                (t.blendModesCanvas[t.blendModes.LIGHTEN] = "source-over"),
                (t.blendModesCanvas[t.blendModes.COLOR_DODGE] = "source-over"),
                (t.blendModesCanvas[t.blendModes.COLOR_BURN] = "source-over"),
                (t.blendModesCanvas[t.blendModes.HARD_LIGHT] = "source-over"),
                (t.blendModesCanvas[t.blendModes.SOFT_LIGHT] = "source-over"),
                (t.blendModesCanvas[t.blendModes.DIFFERENCE] = "source-over"),
                (t.blendModesCanvas[t.blendModes.EXCLUSION] = "source-over"),
                (t.blendModesCanvas[t.blendModes.HUE] = "source-over"),
                (t.blendModesCanvas[t.blendModes.SATURATION] = "source-over"),
                (t.blendModesCanvas[t.blendModes.COLOR] = "source-over"),
                (t.blendModesCanvas[t.blendModes.LUMINOSITY] = "source-over"))),
          (this.width = e || 800),
          (this.height = n || 600),
          (this.view = r || document.createElement("canvas")),
          (this.context = this.view.getContext("2d", {
            alpha: this.transparent,
          })),
          (this.refresh = !0),
          (this.view.width = this.width),
          (this.view.height = this.height),
          (this.count = 0),
          (this.maskManager = new t.CanvasMaskManager()),
          (this.renderSession = {
            context: this.context,
            maskManager: this.maskManager,
            scaleMode: null,
            smoothProperty: null,
          }),
          "imageSmoothingEnabled" in this.context
            ? (this.renderSession.smoothProperty = "imageSmoothingEnabled")
            : "webkitImageSmoothingEnabled" in this.context
            ? (this.renderSession.smoothProperty =
                "webkitImageSmoothingEnabled")
            : "mozImageSmoothingEnabled" in this.context
            ? (this.renderSession.smoothProperty = "mozImageSmoothingEnabled")
            : "oImageSmoothingEnabled" in this.context &&
              (this.renderSession.smoothProperty = "oImageSmoothingEnabled");
      }),
      (t.CanvasRenderer.prototype.constructor = t.CanvasRenderer),
      (t.CanvasRenderer.prototype.render = function (e) {
        (t.texturesToUpdate.length = 0),
          (t.texturesToDestroy.length = 0),
          e.updateTransform(),
          this.context.setTransform(1, 0, 0, 1, 0, 0),
          (this.context.globalAlpha = 1),
          !this.transparent && this.clearBeforeRender
            ? ((this.context.fillStyle = e.backgroundColorString),
              this.context.fillRect(0, 0, this.width, this.height))
            : this.transparent &&
              this.clearBeforeRender &&
              this.context.clearRect(0, 0, this.width, this.height),
          this.renderDisplayObject(e),
          e.interactive &&
            (e._interactiveEventsAdded ||
              ((e._interactiveEventsAdded = !0),
              e.interactionManager.setTarget(this))),
          t.Texture.frameUpdates.length > 0 &&
            (t.Texture.frameUpdates.length = 0);
      }),
      (t.CanvasRenderer.prototype.resize = function (e, t) {
        (this.width = e),
          (this.height = t),
          (this.view.width = e),
          (this.view.height = t);
      }),
      (t.CanvasRenderer.prototype.renderDisplayObject = function (e, t) {
        (this.renderSession.context = t || this.context),
          e._renderCanvas(this.renderSession);
      }),
      (t.CanvasRenderer.prototype.renderStripFlat = function (e) {
        var t = this.context,
          n = e.verticies,
          r = n.length / 2;
        this.count++, t.beginPath();
        for (var i = 1; r - 2 > i; i++) {
          var s = 2 * i,
            o = n[s],
            u = n[s + 2],
            a = n[s + 4],
            f = n[s + 1],
            l = n[s + 3],
            c = n[s + 5];
          t.moveTo(o, f), t.lineTo(u, l), t.lineTo(a, c);
        }
        (t.fillStyle = "#FF0000"), t.fill(), t.closePath();
      }),
      (t.CanvasRenderer.prototype.renderStrip = function (e) {
        var t = this.context,
          n = e.verticies,
          r = e.uvs,
          i = n.length / 2;
        this.count++;
        for (var s = 1; i - 2 > s; s++) {
          var o = 2 * s,
            u = n[o],
            a = n[o + 2],
            f = n[o + 4],
            l = n[o + 1],
            c = n[o + 3],
            h = n[o + 5],
            p = r[o] * e.texture.width,
            d = r[o + 2] * e.texture.width,
            v = r[o + 4] * e.texture.width,
            m = r[o + 1] * e.texture.height,
            g = r[o + 3] * e.texture.height,
            y = r[o + 5] * e.texture.height;
          t.save(),
            t.beginPath(),
            t.moveTo(u, l),
            t.lineTo(a, c),
            t.lineTo(f, h),
            t.closePath(),
            t.clip();
          var b = p * g + m * v + d * y - g * v - m * d - p * y,
            w = u * g + m * f + a * y - g * f - m * a - u * y,
            E = p * a + u * v + d * f - a * v - u * d - p * f,
            S =
              p * g * f +
              m * a * v +
              u * d * y -
              u * g * v -
              m * d * f -
              p * a * y,
            x = l * g + m * h + c * y - g * h - m * c - l * y,
            T = p * c + l * v + d * h - c * v - l * d - p * h,
            N =
              p * g * h +
              m * c * v +
              l * d * y -
              l * g * v -
              m * d * h -
              p * c * y;
          t.transform(w / b, x / b, E / b, T / b, S / b, N / b),
            t.drawImage(e.texture.baseTexture.source, 0, 0),
            t.restore();
        }
      }),
      (t.CanvasBuffer = function (e, t) {
        (this.width = e),
          (this.height = t),
          (this.canvas = document.createElement("canvas")),
          (this.context = this.canvas.getContext("2d")),
          (this.canvas.width = e),
          (this.canvas.height = t);
      }),
      (t.CanvasBuffer.prototype.clear = function () {
        this.context.clearRect(0, 0, this.width, this.height);
      }),
      (t.CanvasBuffer.prototype.resize = function (e, t) {
        (this.width = this.canvas.width = e),
          (this.height = this.canvas.height = t);
      }),
      (t.CanvasGraphics = function () {}),
      (t.CanvasGraphics.renderGraphics = function (e, n) {
        for (
          var r = e.worldAlpha, i = "", s = 0;
          s < e.graphicsData.length;
          s++
        ) {
          var o = e.graphicsData[s],
            u = o.points;
          if (
            ((n.strokeStyle = i =
              "#" + ("00000" + (0 | o.lineColor).toString(16)).substr(-6)),
            (n.lineWidth = o.lineWidth),
            o.type === t.Graphics.POLY)
          ) {
            n.beginPath(), n.moveTo(u[0], u[1]);
            for (var a = 1; a < u.length / 2; a++)
              n.lineTo(u[2 * a], u[2 * a + 1]);
            u[0] === u[u.length - 2] &&
              u[1] === u[u.length - 1] &&
              n.closePath(),
              o.fill &&
                ((n.globalAlpha = o.fillAlpha * r),
                (n.fillStyle = i =
                  "#" + ("00000" + (0 | o.fillColor).toString(16)).substr(-6)),
                n.fill()),
              o.lineWidth && ((n.globalAlpha = o.lineAlpha * r), n.stroke());
          } else if (o.type === t.Graphics.RECT)
            (o.fillColor || 0 === o.fillColor) &&
              ((n.globalAlpha = o.fillAlpha * r),
              (n.fillStyle = i =
                "#" + ("00000" + (0 | o.fillColor).toString(16)).substr(-6)),
              n.fillRect(u[0], u[1], u[2], u[3])),
              o.lineWidth &&
                ((n.globalAlpha = o.lineAlpha * r),
                n.strokeRect(u[0], u[1], u[2], u[3]));
          else if (o.type === t.Graphics.CIRC)
            n.beginPath(),
              n.arc(u[0], u[1], u[2], 0, 2 * Math.PI),
              n.closePath(),
              o.fill &&
                ((n.globalAlpha = o.fillAlpha * r),
                (n.fillStyle = i =
                  "#" + ("00000" + (0 | o.fillColor).toString(16)).substr(-6)),
                n.fill()),
              o.lineWidth && ((n.globalAlpha = o.lineAlpha * r), n.stroke());
          else if (o.type === t.Graphics.ELIP) {
            var f = o.points,
              l = 2 * f[2],
              c = 2 * f[3],
              h = f[0] - l / 2,
              p = f[1] - c / 2;
            n.beginPath();
            var d = 0.5522848,
              v = (l / 2) * d,
              m = (c / 2) * d,
              g = h + l,
              y = p + c,
              w = h + l / 2,
              E = p + c / 2;
            n.moveTo(h, E),
              n.bezierCurveTo(h, E - m, w - v, p, w, p),
              n.bezierCurveTo(w + v, p, g, E - m, g, E),
              n.bezierCurveTo(g, E + m, w + v, y, w, y),
              n.bezierCurveTo(w - v, y, h, E + m, h, E),
              n.closePath(),
              o.fill &&
                ((n.globalAlpha = o.fillAlpha * r),
                (n.fillStyle = i =
                  "#" + ("00000" + (0 | o.fillColor).toString(16)).substr(-6)),
                n.fill()),
              o.lineWidth && ((n.globalAlpha = o.lineAlpha * r), n.stroke());
          }
        }
      }),
      (t.CanvasGraphics.renderGraphicsMask = function (e, n) {
        var r = e.graphicsData.length;
        if (0 !== r) {
          r > 1 &&
            ((r = 1),
            window.console.log(
              "Pixi.js warning: masks in canvas can only mask using the first path in the graphics object"
            ));
          for (var i = 0; 1 > i; i++) {
            var s = e.graphicsData[i],
              o = s.points;
            if (s.type === t.Graphics.POLY) {
              n.beginPath(), n.moveTo(o[0], o[1]);
              for (var u = 1; u < o.length / 2; u++)
                n.lineTo(o[2 * u], o[2 * u + 1]);
              o[0] === o[o.length - 2] &&
                o[1] === o[o.length - 1] &&
                n.closePath();
            } else if (s.type === t.Graphics.RECT)
              n.beginPath(), n.rect(o[0], o[1], o[2], o[3]), n.closePath();
            else if (s.type === t.Graphics.CIRC)
              n.beginPath(),
                n.arc(o[0], o[1], o[2], 0, 2 * Math.PI),
                n.closePath();
            else if (s.type === t.Graphics.ELIP) {
              var a = s.points,
                f = 2 * a[2],
                l = 2 * a[3],
                c = a[0] - f / 2,
                h = a[1] - l / 2;
              n.beginPath();
              var p = 0.5522848,
                d = (f / 2) * p,
                v = (l / 2) * p,
                m = c + f,
                g = h + l,
                y = c + f / 2,
                w = h + l / 2;
              n.moveTo(c, w),
                n.bezierCurveTo(c, w - v, y - d, h, y, h),
                n.bezierCurveTo(y + d, h, m, w - v, m, w),
                n.bezierCurveTo(m, w + v, y + d, g, y, g),
                n.bezierCurveTo(y - d, g, c, w + v, c, w),
                n.closePath();
            }
          }
        }
      }),
      (t.Graphics = function () {
        t.DisplayObjectContainer.call(this),
          (this.renderable = !0),
          (this.fillAlpha = 1),
          (this.lineWidth = 0),
          (this.lineColor = "black"),
          (this.graphicsData = []),
          (this.tint = 16777215),
          (this.blendMode = t.blendModes.NORMAL),
          (this.currentPath = { points: [] }),
          (this._webGL = []),
          (this.isMask = !1),
          (this.bounds = null),
          (this.boundsPadding = 10);
      }),
      (t.Graphics.prototype = Object.create(
        t.DisplayObjectContainer.prototype
      )),
      (t.Graphics.prototype.constructor = t.Graphics),
      Object.defineProperty(t.Graphics.prototype, "cacheAsBitmap", {
        get: function () {
          return this._cacheAsBitmap;
        },
        set: function (e) {
          (this._cacheAsBitmap = e),
            this._cacheAsBitmap
              ? this._generateCachedSprite()
              : (this.destroyCachedSprite(), (this.dirty = !0));
        },
      }),
      (t.Graphics.prototype.lineStyle = function (e, n, r) {
        return (
          this.currentPath.points.length || this.graphicsData.pop(),
          (this.lineWidth = e || 0),
          (this.lineColor = n || 0),
          (this.lineAlpha = arguments.length < 3 ? 1 : r),
          (this.currentPath = {
            lineWidth: this.lineWidth,
            lineColor: this.lineColor,
            lineAlpha: this.lineAlpha,
            fillColor: this.fillColor,
            fillAlpha: this.fillAlpha,
            fill: this.filling,
            points: [],
            type: t.Graphics.POLY,
          }),
          this.graphicsData.push(this.currentPath),
          this
        );
      }),
      (t.Graphics.prototype.moveTo = function (e, n) {
        return (
          this.currentPath.points.length || this.graphicsData.pop(),
          (this.currentPath = this.currentPath =
            {
              lineWidth: this.lineWidth,
              lineColor: this.lineColor,
              lineAlpha: this.lineAlpha,
              fillColor: this.fillColor,
              fillAlpha: this.fillAlpha,
              fill: this.filling,
              points: [],
              type: t.Graphics.POLY,
            }),
          this.currentPath.points.push(e, n),
          this.graphicsData.push(this.currentPath),
          this
        );
      }),
      (t.Graphics.prototype.lineTo = function (e, t) {
        return this.currentPath.points.push(e, t), (this.dirty = !0), this;
      }),
      (t.Graphics.prototype.beginFill = function (e, t) {
        return (
          (this.filling = !0),
          (this.fillColor = e || 0),
          (this.fillAlpha = arguments.length < 2 ? 1 : t),
          this
        );
      }),
      (t.Graphics.prototype.endFill = function () {
        return (
          (this.filling = !1),
          (this.fillColor = null),
          (this.fillAlpha = 1),
          this
        );
      }),
      (t.Graphics.prototype.drawRect = function (e, n, r, i) {
        return (
          this.currentPath.points.length || this.graphicsData.pop(),
          (this.currentPath = {
            lineWidth: this.lineWidth,
            lineColor: this.lineColor,
            lineAlpha: this.lineAlpha,
            fillColor: this.fillColor,
            fillAlpha: this.fillAlpha,
            fill: this.filling,
            points: [e, n, r, i],
            type: t.Graphics.RECT,
          }),
          this.graphicsData.push(this.currentPath),
          (this.dirty = !0),
          this
        );
      }),
      (t.Graphics.prototype.drawCircle = function (e, n, r) {
        return (
          this.currentPath.points.length || this.graphicsData.pop(),
          (this.currentPath = {
            lineWidth: this.lineWidth,
            lineColor: this.lineColor,
            lineAlpha: this.lineAlpha,
            fillColor: this.fillColor,
            fillAlpha: this.fillAlpha,
            fill: this.filling,
            points: [e, n, r, r],
            type: t.Graphics.CIRC,
          }),
          this.graphicsData.push(this.currentPath),
          (this.dirty = !0),
          this
        );
      }),
      (t.Graphics.prototype.drawEllipse = function (e, n, r, i) {
        return (
          this.currentPath.points.length || this.graphicsData.pop(),
          (this.currentPath = {
            lineWidth: this.lineWidth,
            lineColor: this.lineColor,
            lineAlpha: this.lineAlpha,
            fillColor: this.fillColor,
            fillAlpha: this.fillAlpha,
            fill: this.filling,
            points: [e, n, r, i],
            type: t.Graphics.ELIP,
          }),
          this.graphicsData.push(this.currentPath),
          (this.dirty = !0),
          this
        );
      }),
      (t.Graphics.prototype.clear = function () {
        return (
          (this.lineWidth = 0),
          (this.filling = !1),
          (this.dirty = !0),
          (this.clearDirty = !0),
          (this.graphicsData = []),
          (this.bounds = null),
          this
        );
      }),
      (t.Graphics.prototype.generateTexture = function () {
        var e = this.getBounds(),
          n = new t.CanvasBuffer(e.width, e.height),
          r = t.Texture.fromCanvas(n.canvas);
        return (
          n.context.translate(-e.x, -e.y),
          t.CanvasGraphics.renderGraphics(this, n.context),
          r
        );
      }),
      (t.Graphics.prototype._renderWebGL = function (e) {
        if (this.visible !== !1 && 0 !== this.alpha && this.isMask !== !0) {
          if (this._cacheAsBitmap)
            return (
              this.dirty &&
                (this._generateCachedSprite(),
                t.updateWebGLTexture(
                  this._cachedSprite.texture.baseTexture,
                  e.gl
                ),
                (this.dirty = !1)),
              void t.Sprite.prototype._renderWebGL.call(this._cachedSprite, e)
            );
          if (
            (e.spriteBatch.stop(),
            this._mask && e.maskManager.pushMask(this.mask, e),
            this._filters && e.filterManager.pushFilter(this._filterBlock),
            this.blendMode !== e.spriteBatch.currentBlendMode)
          ) {
            e.spriteBatch.currentBlendMode = this.blendMode;
            var n = t.blendModesWebGL[e.spriteBatch.currentBlendMode];
            e.spriteBatch.gl.blendFunc(n[0], n[1]);
          }
          if ((t.WebGLGraphics.renderGraphics(this, e), this.children.length)) {
            e.spriteBatch.start();
            for (var r = 0, i = this.children.length; i > r; r++)
              this.children[r]._renderWebGL(e);
            e.spriteBatch.stop();
          }
          this._filters && e.filterManager.popFilter(),
            this._mask && e.maskManager.popMask(e),
            e.drawCount++,
            e.spriteBatch.start();
        }
      }),
      (t.Graphics.prototype._renderCanvas = function (e) {
        if (this.visible !== !1 && 0 !== this.alpha && this.isMask !== !0) {
          var n = e.context,
            r = this.worldTransform;
          this.blendMode !== e.currentBlendMode &&
            ((e.currentBlendMode = this.blendMode),
            (n.globalCompositeOperation =
              t.blendModesCanvas[e.currentBlendMode])),
            n.setTransform(r.a, r.c, r.b, r.d, r.tx, r.ty),
            t.CanvasGraphics.renderGraphics(this, n);
          for (var i = 0, s = this.children.length; s > i; i++)
            this.children[i]._renderCanvas(e);
        }
      }),
      (t.Graphics.prototype.getBounds = function (e) {
        this.bounds || this.updateBounds();
        var t = this.bounds.x,
          n = this.bounds.width + this.bounds.x,
          r = this.bounds.y,
          i = this.bounds.height + this.bounds.y,
          s = e || this.worldTransform,
          o = s.a,
          u = s.c,
          a = s.b,
          f = s.d,
          l = s.tx,
          c = s.ty,
          h = o * n + a * i + l,
          p = f * i + u * n + c,
          d = o * t + a * i + l,
          v = f * i + u * t + c,
          m = o * t + a * r + l,
          g = f * r + u * t + c,
          y = o * n + a * r + l,
          b = f * r + u * n + c,
          w = -1 / 0,
          E = -1 / 0,
          S = 1 / 0,
          x = 1 / 0;
        (S = S > h ? h : S),
          (S = S > d ? d : S),
          (S = S > m ? m : S),
          (S = S > y ? y : S),
          (x = x > p ? p : x),
          (x = x > v ? v : x),
          (x = x > g ? g : x),
          (x = x > b ? b : x),
          (w = h > w ? h : w),
          (w = d > w ? d : w),
          (w = m > w ? m : w),
          (w = y > w ? y : w),
          (E = p > E ? p : E),
          (E = v > E ? v : E),
          (E = g > E ? g : E),
          (E = b > E ? b : E);
        var T = this._bounds;
        return (T.x = S), (T.width = w - S), (T.y = x), (T.height = E - x), T;
      }),
      (t.Graphics.prototype.updateBounds = function () {
        for (
          var e,
            n,
            r,
            i,
            s,
            o = 1 / 0,
            u = -1 / 0,
            a = 1 / 0,
            f = -1 / 0,
            l = 0;
          l < this.graphicsData.length;
          l++
        ) {
          var c = this.graphicsData[l],
            h = c.type,
            p = c.lineWidth;
          if (((e = c.points), h === t.Graphics.RECT))
            (n = e[0] - p / 2),
              (r = e[1] - p / 2),
              (i = e[2] + p),
              (s = e[3] + p),
              (o = o > n ? n : o),
              (u = n + i > u ? n + i : u),
              (a = a > r ? n : a),
              (f = r + s > f ? r + s : f);
          else if (h === t.Graphics.CIRC || h === t.Graphics.ELIP)
            (n = e[0]),
              (r = e[1]),
              (i = e[2] + p / 2),
              (s = e[3] + p / 2),
              (o = o > n - i ? n - i : o),
              (u = n + i > u ? n + i : u),
              (a = a > r - s ? r - s : a),
              (f = r + s > f ? r + s : f);
          else
            for (var d = 0; d < e.length; d += 2)
              (n = e[d]),
                (r = e[d + 1]),
                (o = o > n - p ? n - p : o),
                (u = n + p > u ? n + p : u),
                (a = a > r - p ? r - p : a),
                (f = r + p > f ? r + p : f);
        }
        var v = this.boundsPadding;
        this.bounds = new t.Rectangle(
          o - v,
          a - v,
          u - o + 2 * v,
          f - a + 2 * v
        );
      }),
      (t.Graphics.prototype._generateCachedSprite = function () {
        var e = this.getLocalBounds();
        if (this._cachedSprite)
          this._cachedSprite.buffer.resize(e.width, e.height);
        else {
          var n = new t.CanvasBuffer(e.width, e.height),
            r = t.Texture.fromCanvas(n.canvas);
          (this._cachedSprite = new t.Sprite(r)),
            (this._cachedSprite.buffer = n),
            (this._cachedSprite.worldTransform = this.worldTransform);
        }
        (this._cachedSprite.anchor.x = -(e.x / e.width)),
          (this._cachedSprite.anchor.y = -(e.y / e.height)),
          this._cachedSprite.buffer.context.translate(-e.x, -e.y),
          t.CanvasGraphics.renderGraphics(
            this,
            this._cachedSprite.buffer.context
          );
      }),
      (t.Graphics.prototype.destroyCachedSprite = function () {
        this._cachedSprite.texture.destroy(!0), (this._cachedSprite = null);
      }),
      (t.Graphics.POLY = 0),
      (t.Graphics.RECT = 1),
      (t.Graphics.CIRC = 2),
      (t.Graphics.ELIP = 3),
      (t.TilingSprite = function (e, n, r) {
        t.Sprite.call(this, e),
          (this.width = n || 100),
          (this.height = r || 100),
          (this.tileScale = new t.Point(1, 1)),
          (this.tileScaleOffset = new t.Point(1, 1)),
          (this.tilePosition = new t.Point(0, 0)),
          (this.renderable = !0),
          (this.tint = 16777215),
          (this.blendMode = t.blendModes.NORMAL);
      }),
      (t.TilingSprite.prototype = Object.create(t.Sprite.prototype)),
      (t.TilingSprite.prototype.constructor = t.TilingSprite),
      Object.defineProperty(t.TilingSprite.prototype, "width", {
        get: function () {
          return this._width;
        },
        set: function (e) {
          this._width = e;
        },
      }),
      Object.defineProperty(t.TilingSprite.prototype, "height", {
        get: function () {
          return this._height;
        },
        set: function (e) {
          this._height = e;
        },
      }),
      (t.TilingSprite.prototype.onTextureUpdate = function () {
        this.updateFrame = !0;
      }),
      (t.TilingSprite.prototype.setTexture = function (e) {
        this.texture !== e &&
          ((this.texture = e),
          (this.refreshTexture = !0),
          (this.cachedTint = 16777215));
      }),
      (t.TilingSprite.prototype._renderWebGL = function (e) {
        if (this.visible !== !1 && 0 !== this.alpha) {
          var n, r;
          for (
            this.mask &&
              (e.spriteBatch.stop(),
              e.maskManager.pushMask(this.mask, e),
              e.spriteBatch.start()),
              this.filters &&
                (e.spriteBatch.flush(),
                e.filterManager.pushFilter(this._filterBlock)),
              !this.tilingTexture || this.refreshTexture
                ? (this.generateTilingTexture(!0),
                  this.tilingTexture &&
                    this.tilingTexture.needsUpdate &&
                    (t.updateWebGLTexture(this.tilingTexture.baseTexture, e.gl),
                    (this.tilingTexture.needsUpdate = !1)))
                : e.spriteBatch.renderTilingSprite(this),
              n = 0,
              r = this.children.length;
            r > n;
            n++
          )
            this.children[n]._renderWebGL(e);
          e.spriteBatch.stop(),
            this.filters && e.filterManager.popFilter(),
            this.mask && e.maskManager.popMask(e),
            e.spriteBatch.start();
        }
      }),
      (t.TilingSprite.prototype._renderCanvas = function (e) {
        if (this.visible !== !1 && 0 !== this.alpha) {
          var n = e.context;
          this._mask && e.maskManager.pushMask(this._mask, n),
            (n.globalAlpha = this.worldAlpha);
          var r = this.worldTransform;
          n.setTransform(r.a, r.c, r.b, r.d, r.tx, r.ty),
            (!this.__tilePattern || this.refreshTexture) &&
              (this.generateTilingTexture(!1),
              this.tilingTexture &&
                (this.__tilePattern = n.createPattern(
                  this.tilingTexture.baseTexture.source,
                  "repeat"
                ))),
            this.blendMode !== e.currentBlendMode &&
              ((e.currentBlendMode = this.blendMode),
              (n.globalCompositeOperation =
                t.blendModesCanvas[e.currentBlendMode])),
            n.beginPath();
          var i = this.tilePosition,
            s = this.tileScale;
          (i.x %= this.tilingTexture.baseTexture.width),
            (i.y %= this.tilingTexture.baseTexture.height),
            n.scale(s.x, s.y),
            n.translate(i.x, i.y),
            (n.fillStyle = this.__tilePattern),
            n.fillRect(-i.x, -i.y, this.width / s.x, this.height / s.y),
            n.scale(1 / s.x, 1 / s.y),
            n.translate(-i.x, -i.y),
            n.closePath(),
            this._mask && e.maskManager.popMask(e.context);
        }
      }),
      (t.TilingSprite.prototype.getBounds = function () {
        var e = this._width,
          t = this._height,
          n = e * (1 - this.anchor.x),
          r = e * -this.anchor.x,
          i = t * (1 - this.anchor.y),
          s = t * -this.anchor.y,
          o = this.worldTransform,
          u = o.a,
          a = o.c,
          f = o.b,
          l = o.d,
          c = o.tx,
          h = o.ty,
          p = u * r + f * s + c,
          d = l * s + a * r + h,
          v = u * n + f * s + c,
          m = l * s + a * n + h,
          g = u * n + f * i + c,
          y = l * i + a * n + h,
          b = u * r + f * i + c,
          w = l * i + a * r + h,
          E = -1 / 0,
          S = -1 / 0,
          x = 1 / 0,
          T = 1 / 0;
        (x = x > p ? p : x),
          (x = x > v ? v : x),
          (x = x > g ? g : x),
          (x = x > b ? b : x),
          (T = T > d ? d : T),
          (T = T > m ? m : T),
          (T = T > y ? y : T),
          (T = T > w ? w : T),
          (E = p > E ? p : E),
          (E = v > E ? v : E),
          (E = g > E ? g : E),
          (E = b > E ? b : E),
          (S = d > S ? d : S),
          (S = m > S ? m : S),
          (S = y > S ? y : S),
          (S = w > S ? w : S);
        var N = this._bounds;
        return (
          (N.x = x),
          (N.width = E - x),
          (N.y = T),
          (N.height = S - T),
          (this._currentBounds = N),
          N
        );
      }),
      (t.TilingSprite.prototype.generateTilingTexture = function (e) {
        var n = this.texture;
        if (n.baseTexture.hasLoaded) {
          var r,
            i,
            s = n.baseTexture,
            o = n.frame,
            u = o.width !== s.width || o.height !== s.height,
            a = !1;
          if (
            (e
              ? ((r = t.getNextPowerOfTwo(o.width)),
                (i = t.getNextPowerOfTwo(o.height)),
                o.width !== r && o.height !== i && (a = !0))
              : u && ((r = o.width), (i = o.height), (a = !0)),
            a)
          ) {
            var f;
            this.tilingTexture && this.tilingTexture.isTiling
              ? ((f = this.tilingTexture.canvasBuffer),
                f.resize(r, i),
                (this.tilingTexture.baseTexture.width = r),
                (this.tilingTexture.baseTexture.height = i),
                (this.tilingTexture.needsUpdate = !0))
              : ((f = new t.CanvasBuffer(r, i)),
                (this.tilingTexture = t.Texture.fromCanvas(f.canvas)),
                (this.tilingTexture.canvasBuffer = f),
                (this.tilingTexture.isTiling = !0)),
              f.context.drawImage(
                n.baseTexture.source,
                o.x,
                o.y,
                o.width,
                o.height,
                0,
                0,
                r,
                i
              ),
              (this.tileScaleOffset.x = o.width / r),
              (this.tileScaleOffset.y = o.height / i);
          } else
            this.tilingTexture &&
              this.tilingTexture.isTiling &&
              this.tilingTexture.destroy(!0),
              (this.tileScaleOffset.x = 1),
              (this.tileScaleOffset.y = 1),
              (this.tilingTexture = n);
          (this.refreshTexture = !1),
            (this.tilingTexture.baseTexture._powerOf2 = !0);
        }
      }),
      (t.BaseTextureCache = {}),
      (t.texturesToUpdate = []),
      (t.texturesToDestroy = []),
      (t.BaseTextureCacheIdGenerator = 0),
      (t.BaseTexture = function (e, n) {
        if (
          (t.EventTarget.call(this),
          (this.width = 100),
          (this.height = 100),
          (this.scaleMode = n || t.scaleModes.DEFAULT),
          (this.hasLoaded = !1),
          (this.source = e),
          (this.id = t.BaseTextureCacheIdGenerator++),
          (this._glTextures = []),
          e)
        ) {
          if (this.source.complete || this.source.getContext)
            (this.hasLoaded = !0),
              (this.width = this.source.width),
              (this.height = this.source.height),
              t.texturesToUpdate.push(this);
          else {
            var r = this;
            this.source.onload = function () {
              (r.hasLoaded = !0),
                (r.width = r.source.width),
                (r.height = r.source.height),
                t.texturesToUpdate.push(r),
                r.dispatchEvent({ type: "loaded", content: r });
            };
          }
          (this.imageUrl = null), (this._powerOf2 = !1);
        }
      }),
      (t.BaseTexture.prototype.constructor = t.BaseTexture),
      (t.BaseTexture.prototype.destroy = function () {
        this.imageUrl &&
          (delete t.BaseTextureCache[this.imageUrl],
          (this.imageUrl = null),
          (this.source.src = null)),
          (this.source = null),
          t.texturesToDestroy.push(this);
      }),
      (t.BaseTexture.prototype.updateSourceImage = function (e) {
        (this.hasLoaded = !1), (this.source.src = null), (this.source.src = e);
      }),
      (t.BaseTexture.fromImage = function (e, n, r) {
        var i = t.BaseTextureCache[e];
        if (!i) {
          var s = new Image();
          n && (s.crossOrigin = ""),
            (s.src = e),
            (i = new t.BaseTexture(s, r)),
            (i.imageUrl = e),
            (t.BaseTextureCache[e] = i);
        }
        return i;
      }),
      (t.BaseTexture.fromCanvas = function (e, n) {
        e._pixiId || (e._pixiId = "canvas_" + t.TextureCacheIdGenerator++);
        var r = t.BaseTextureCache[e._pixiId];
        return (
          r ||
            ((r = new t.BaseTexture(e, n)),
            (t.BaseTextureCache[e._pixiId] = r)),
          r
        );
      }),
      (t.TextureCache = {}),
      (t.FrameCache = {}),
      (t.TextureCacheIdGenerator = 0),
      (t.Texture = function (e, n) {
        if (
          (t.EventTarget.call(this),
          n || ((this.noFrame = !0), (n = new t.Rectangle(0, 0, 1, 1))),
          e instanceof t.Texture && (e = e.baseTexture),
          (this.baseTexture = e),
          (this.frame = n),
          (this.trim = null),
          (this.scope = this),
          (this._uvs = null),
          e.hasLoaded)
        )
          this.noFrame && (n = new t.Rectangle(0, 0, e.width, e.height)),
            this.setFrame(n);
        else {
          var r = this;
          e.addEventListener("loaded", function () {
            r.onBaseTextureLoaded();
          });
        }
      }),
      (t.Texture.prototype.constructor = t.Texture),
      (t.Texture.prototype.onBaseTextureLoaded = function () {
        var e = this.baseTexture;
        e.removeEventListener("loaded", this.onLoaded),
          this.noFrame &&
            (this.frame = new t.Rectangle(0, 0, e.width, e.height)),
          this.setFrame(this.frame),
          this.scope.dispatchEvent({ type: "update", content: this });
      }),
      (t.Texture.prototype.destroy = function (e) {
        e && this.baseTexture.destroy();
      }),
      (t.Texture.prototype.setFrame = function (e) {
        if (
          ((this.frame = e),
          (this.width = e.width),
          (this.height = e.height),
          e.x + e.width > this.baseTexture.width ||
            e.y + e.height > this.baseTexture.height)
        )
          throw new Error(
            "Texture Error: frame does not fit inside the base Texture dimensions " +
              this
          );
        (this.updateFrame = !0), t.Texture.frameUpdates.push(this);
      }),
      (t.Texture.prototype._updateWebGLuvs = function () {
        this._uvs || (this._uvs = new t.TextureUvs());
        var e = this.frame,
          n = this.baseTexture.width,
          r = this.baseTexture.height;
        (this._uvs.x0 = e.x / n),
          (this._uvs.y0 = e.y / r),
          (this._uvs.x1 = (e.x + e.width) / n),
          (this._uvs.y1 = e.y / r),
          (this._uvs.x2 = (e.x + e.width) / n),
          (this._uvs.y2 = (e.y + e.height) / r),
          (this._uvs.x3 = e.x / n),
          (this._uvs.y3 = (e.y + e.height) / r);
      }),
      (t.Texture.fromImage = function (e, n, r) {
        var i = t.TextureCache[e];
        return (
          i ||
            ((i = new t.Texture(t.BaseTexture.fromImage(e, n, r))),
            (t.TextureCache[e] = i)),
          i
        );
      }),
      (t.Texture.fromFrame = function (e) {
        var n = t.TextureCache[e];
        if (!n)
          throw new Error(
            'The frameId "' + e + '" does not exist in the texture cache '
          );
        return n;
      }),
      (t.Texture.fromCanvas = function (e, n) {
        var r = t.BaseTexture.fromCanvas(e, n);
        return new t.Texture(r);
      }),
      (t.Texture.addTextureToCache = function (e, n) {
        t.TextureCache[n] = e;
      }),
      (t.Texture.removeTextureFromCache = function (e) {
        var n = t.TextureCache[e];
        return delete t.TextureCache[e], delete t.BaseTextureCache[e], n;
      }),
      (t.Texture.frameUpdates = []),
      (t.TextureUvs = function () {
        (this.x0 = 0),
          (this.y0 = 0),
          (this.x1 = 0),
          (this.y1 = 0),
          (this.x2 = 0),
          (this.y2 = 0),
          (this.x3 = 0),
          (this.y4 = 0);
      }),
      (t.RenderTexture = function (e, n, r) {
        if (
          (t.EventTarget.call(this),
          (this.width = e || 100),
          (this.height = n || 100),
          (this.frame = new t.Rectangle(0, 0, this.width, this.height)),
          (this.baseTexture = new t.BaseTexture()),
          (this.baseTexture.width = this.width),
          (this.baseTexture.height = this.height),
          (this.baseTexture._glTextures = []),
          (this.baseTexture.hasLoaded = !0),
          (this.renderer = r || t.defaultRenderer),
          this.renderer.type === t.WEBGL_RENDERER)
        ) {
          var i = this.renderer.gl;
          (this.textureBuffer = new t.FilterTexture(
            i,
            this.width,
            this.height
          )),
            (this.baseTexture._glTextures[i.id] = this.textureBuffer.texture),
            (this.render = this.renderWebGL),
            (this.projection = new t.Point(this.width / 2, -this.height / 2));
        } else
          console.log("renderer canvas"),
            (this.render = this.renderCanvas),
            (this.textureBuffer = new t.CanvasBuffer(this.width, this.height)),
            (this.baseTexture.source = this.textureBuffer.canvas);
        t.Texture.frameUpdates.push(this);
      }),
      (t.RenderTexture.prototype = Object.create(t.Texture.prototype)),
      (t.RenderTexture.prototype.constructor = t.RenderTexture),
      (t.RenderTexture.prototype.resize = function (e, n) {
        if (
          ((this.width = e),
          (this.height = n),
          (this.frame.width = this.width),
          (this.frame.height = this.height),
          this.renderer.type === t.WEBGL_RENDERER)
        ) {
          (this.projection.x = this.width / 2),
            (this.projection.y = -this.height / 2);
          var r = this.renderer.gl;
          r.bindTexture(r.TEXTURE_2D, this.baseTexture._glTextures[r.id]),
            r.texImage2D(
              r.TEXTURE_2D,
              0,
              r.RGBA,
              this.width,
              this.height,
              0,
              r.RGBA,
              r.UNSIGNED_BYTE,
              null
            );
        } else this.textureBuffer.resize(this.width, this.height);
        t.Texture.frameUpdates.push(this);
      }),
      (t.RenderTexture.prototype.renderWebGL = function (e, n, r) {
        var i = this.renderer.gl;
        i.colorMask(!0, !0, !0, !0),
          i.viewport(0, 0, this.width, this.height),
          i.bindFramebuffer(i.FRAMEBUFFER, this.textureBuffer.frameBuffer),
          r && this.textureBuffer.clear();
        var s = e.children,
          o = e.worldTransform;
        (e.worldTransform = t.RenderTexture.tempMatrix),
          (e.worldTransform.d = -1),
          (e.worldTransform.ty = -2 * this.projection.y),
          n && ((e.worldTransform.tx = n.x), (e.worldTransform.ty -= n.y));
        for (var u = 0, a = s.length; a > u; u++) s[u].updateTransform();
        t.WebGLRenderer.updateTextures(),
          this.renderer.renderDisplayObject(
            e,
            this.projection,
            this.textureBuffer.frameBuffer
          ),
          (e.worldTransform = o);
      }),
      (t.RenderTexture.prototype.renderCanvas = function (e, n, r) {
        var i = e.children,
          s = e.worldTransform;
        (e.worldTransform = t.RenderTexture.tempMatrix),
          n && ((e.worldTransform.tx = n.x), (e.worldTransform.ty = n.y));
        for (var o = 0, u = i.length; u > o; o++) i[o].updateTransform();
        r && this.textureBuffer.clear();
        var a = this.textureBuffer.context;
        this.renderer.renderDisplayObject(e, a),
          a.setTransform(1, 0, 0, 1, 0, 0),
          (e.worldTransform = s);
      }),
      (t.RenderTexture.tempMatrix = new t.Matrix()),
      "undefined" != typeof exports
        ? ("undefined" != typeof module &&
            module.exports &&
            (exports = module.exports = t),
          (exports.PIXI = t))
        : "undefined" != typeof define && define.amd
        ? define(
            "PIXI",
            (function () {
              return (e.PIXI = t);
            })()
          )
        : (e.PIXI = t);
  }.call(this),
  function () {
    var e = this,
      t = t || {
        VERSION: "<%= version %>",
        DEV_VERSION: "2.0.2",
        GAMES: [],
        AUTO: 0,
        CANVAS: 1,
        WEBGL: 2,
        HEADLESS: 3,
        NONE: 0,
        LEFT: 1,
        RIGHT: 2,
        UP: 3,
        DOWN: 4,
        SPRITE: 0,
        BUTTON: 1,
        IMAGE: 2,
        GRAPHICS: 3,
        TEXT: 4,
        TILESPRITE: 5,
        BITMAPTEXT: 6,
        GROUP: 7,
        RENDERTEXTURE: 8,
        TILEMAP: 9,
        TILEMAPLAYER: 10,
        EMITTER: 11,
        POLYGON: 12,
        BITMAPDATA: 13,
        CANVAS_FILTER: 14,
        WEBGL_FILTER: 15,
        ELLIPSE: 16,
        SPRITEBATCH: 17,
        RETROFONT: 18,
        blendModes: {
          NORMAL: 0,
          ADD: 1,
          MULTIPLY: 2,
          SCREEN: 3,
          OVERLAY: 4,
          DARKEN: 5,
          LIGHTEN: 6,
          COLOR_DODGE: 7,
          COLOR_BURN: 8,
          HARD_LIGHT: 9,
          SOFT_LIGHT: 10,
          DIFFERENCE: 11,
          EXCLUSION: 12,
          HUE: 13,
          SATURATION: 14,
          COLOR: 15,
          LUMINOSITY: 16,
        },
        scaleModes: { DEFAULT: 0, LINEAR: 0, NEAREST: 1 },
      };
    (PIXI.InteractionManager = function () {}),
      (t.Utils = {
        parseDimension: function (e, t) {
          var n = 0,
            r = 0;
          return (
            "string" == typeof e
              ? "%" === e.substr(-1)
                ? ((n = parseInt(e, 10) / 100),
                  (r =
                    0 === t ? window.innerWidth * n : window.innerHeight * n))
                : (r = parseInt(e, 10))
              : (r = e),
            r
          );
        },
        shuffle: function (e) {
          for (var t = e.length - 1; t > 0; t--) {
            var n = Math.floor(Math.random() * (t + 1)),
              r = e[t];
            (e[t] = e[n]), (e[n] = r);
          }
          return e;
        },
        pad: function (e, t, n, r) {
          if ("undefined" == typeof t) var t = 0;
          if ("undefined" == typeof n) var n = " ";
          if ("undefined" == typeof r) var r = 3;
          var i = 0;
          if (t + 1 >= e.length)
            switch (r) {
              case 1:
                e = new Array(t + 1 - e.length).join(n) + e;
                break;
              case 3:
                var s = Math.ceil((i = t - e.length) / 2),
                  o = i - s;
                e = new Array(o + 1).join(n) + e + new Array(s + 1).join(n);
                break;
              default:
                e += new Array(t + 1 - e.length).join(n);
            }
          return e;
        },
        isPlainObject: function (e) {
          if ("object" != typeof e || e.nodeType || e === e.window) return !1;
          try {
            if (
              e.constructor &&
              !{}.hasOwnProperty.call(e.constructor.prototype, "isPrototypeOf")
            )
              return !1;
          } catch (t) {
            return !1;
          }
          return !0;
        },
        extend: function () {
          var e,
            n,
            r,
            i,
            s,
            o,
            u = arguments[0] || {},
            a = 1,
            f = arguments.length,
            l = !1;
          for (
            "boolean" == typeof u &&
              ((l = u), (u = arguments[1] || {}), (a = 2)),
              f === a && ((u = this), --a);
            f > a;
            a++
          )
            if (null != (e = arguments[a]))
              for (n in e)
                (r = u[n]),
                  (i = e[n]),
                  u !== i &&
                    (l &&
                    i &&
                    (t.Utils.isPlainObject(i) || (s = Array.isArray(i)))
                      ? (s
                          ? ((s = !1), (o = r && Array.isArray(r) ? r : []))
                          : (o = r && t.Utils.isPlainObject(r) ? r : {}),
                        (u[n] = t.Utils.extend(l, o, i)))
                      : void 0 !== i && (u[n] = i));
          return u;
        },
      }),
      "function" != typeof Function.prototype.bind &&
        (Function.prototype.bind = (function () {
          var e = Array.prototype.slice;
          return function (t) {
            function n() {
              var s = i.concat(e.call(arguments));
              r.apply(this instanceof n ? this : t, s);
            }
            var r = this,
              i = e.call(arguments, 1);
            if ("function" != typeof r) throw new TypeError();
            return (
              (n.prototype = (function s(e) {
                return (
                  e && (s.prototype = e), this instanceof s ? void 0 : new s()
                );
              })(r.prototype)),
              n
            );
          };
        })()),
      Array.isArray ||
        (Array.isArray = function (e) {
          return "[object Array]" == Object.prototype.toString.call(e);
        }),
      (t.Circle = function (e, t, n) {
        (e = e || 0),
          (t = t || 0),
          (n = n || 0),
          (this.x = e),
          (this.y = t),
          (this._diameter = n),
          (this._radius = n > 0 ? 0.5 * n : 0);
      }),
      (t.Circle.prototype = {
        circumference: function () {
          return 2 * Math.PI * this._radius;
        },
        setTo: function (e, t, n) {
          return (
            (this.x = e),
            (this.y = t),
            (this._diameter = n),
            (this._radius = 0.5 * n),
            this
          );
        },
        copyFrom: function (e) {
          return this.setTo(e.x, e.y, e.diameter);
        },
        copyTo: function (e) {
          return (
            (e.x = this.x), (e.y = this.y), (e.diameter = this._diameter), e
          );
        },
        distance: function (e, n) {
          return (
            "undefined" == typeof n && (n = !1),
            n
              ? t.Math.distanceRound(this.x, this.y, e.x, e.y)
              : t.Math.distance(this.x, this.y, e.x, e.y)
          );
        },
        clone: function (e) {
          return (
            "undefined" == typeof e
              ? (e = new t.Circle(this.x, this.y, this.diameter))
              : e.setTo(this.x, this.y, this.diameter),
            e
          );
        },
        contains: function (e, n) {
          return t.Circle.contains(this, e, n);
        },
        circumferencePoint: function (e, n, r) {
          return t.Circle.circumferencePoint(this, e, n, r);
        },
        offset: function (e, t) {
          return (this.x += e), (this.y += t), this;
        },
        offsetPoint: function (e) {
          return this.offset(e.x, e.y);
        },
        toString: function () {
          return (
            "[{Phaser.Circle (x=" +
            this.x +
            " y=" +
            this.y +
            " diameter=" +
            this.diameter +
            " radius=" +
            this.radius +
            ")}]"
          );
        },
      }),
      (t.Circle.prototype.constructor = t.Circle),
      Object.defineProperty(t.Circle.prototype, "diameter", {
        get: function () {
          return this._diameter;
        },
        set: function (e) {
          e > 0 && ((this._diameter = e), (this._radius = 0.5 * e));
        },
      }),
      Object.defineProperty(t.Circle.prototype, "radius", {
        get: function () {
          return this._radius;
        },
        set: function (e) {
          e > 0 && ((this._radius = e), (this._diameter = 2 * e));
        },
      }),
      Object.defineProperty(t.Circle.prototype, "left", {
        get: function () {
          return this.x - this._radius;
        },
        set: function (e) {
          e > this.x
            ? ((this._radius = 0), (this._diameter = 0))
            : (this.radius = this.x - e);
        },
      }),
      Object.defineProperty(t.Circle.prototype, "right", {
        get: function () {
          return this.x + this._radius;
        },
        set: function (e) {
          e < this.x
            ? ((this._radius = 0), (this._diameter = 0))
            : (this.radius = e - this.x);
        },
      }),
      Object.defineProperty(t.Circle.prototype, "top", {
        get: function () {
          return this.y - this._radius;
        },
        set: function (e) {
          e > this.y
            ? ((this._radius = 0), (this._diameter = 0))
            : (this.radius = this.y - e);
        },
      }),
      Object.defineProperty(t.Circle.prototype, "bottom", {
        get: function () {
          return this.y + this._radius;
        },
        set: function (e) {
          e < this.y
            ? ((this._radius = 0), (this._diameter = 0))
            : (this.radius = e - this.y);
        },
      }),
      Object.defineProperty(t.Circle.prototype, "area", {
        get: function () {
          return this._radius > 0 ? Math.PI * this._radius * this._radius : 0;
        },
      }),
      Object.defineProperty(t.Circle.prototype, "empty", {
        get: function () {
          return 0 === this._diameter;
        },
        set: function (e) {
          e === !0 && this.setTo(0, 0, 0);
        },
      }),
      (t.Circle.contains = function (e, t, n) {
        if (
          e.radius > 0 &&
          t >= e.left &&
          t <= e.right &&
          n >= e.top &&
          n <= e.bottom
        ) {
          var r = (e.x - t) * (e.x - t),
            i = (e.y - n) * (e.y - n);
          return r + i <= e.radius * e.radius;
        }
        return !1;
      }),
      (t.Circle.equals = function (e, t) {
        return e.x == t.x && e.y == t.y && e.diameter == t.diameter;
      }),
      (t.Circle.intersects = function (e, n) {
        return t.Math.distance(e.x, e.y, n.x, n.y) <= e.radius + n.radius;
      }),
      (t.Circle.circumferencePoint = function (e, n, r, i) {
        return (
          "undefined" == typeof r && (r = !1),
          "undefined" == typeof i && (i = new t.Point()),
          r === !0 && (n = t.Math.degToRad(n)),
          (i.x = e.x + e.radius * Math.cos(n)),
          (i.y = e.y + e.radius * Math.sin(n)),
          i
        );
      }),
      (t.Circle.intersectsRectangle = function (e, t) {
        var n = Math.abs(e.x - t.x - t.halfWidth),
          r = t.halfWidth + e.radius;
        if (n > r) return !1;
        var i = Math.abs(e.y - t.y - t.halfHeight),
          s = t.halfHeight + e.radius;
        if (i > s) return !1;
        if (n <= t.halfWidth || i <= t.halfHeight) return !0;
        var o = n - t.halfWidth,
          u = i - t.halfHeight,
          a = o * o,
          f = u * u,
          l = e.radius * e.radius;
        return l >= a + f;
      }),
      (PIXI.Circle = t.Circle),
      (t.Point = function (e, t) {
        (e = e || 0), (t = t || 0), (this.x = e), (this.y = t);
      }),
      (t.Point.prototype = {
        copyFrom: function (e) {
          return this.setTo(e.x, e.y);
        },
        invert: function () {
          return this.setTo(this.y, this.x);
        },
        setTo: function (e, t) {
          return (
            (this.x = e || 0), (this.y = t || (0 !== t ? this.x : 0)), this
          );
        },
        set: function (e, t) {
          return (
            (this.x = e || 0), (this.y = t || (0 !== t ? this.x : 0)), this
          );
        },
        add: function (e, t) {
          return (this.x += e), (this.y += t), this;
        },
        subtract: function (e, t) {
          return (this.x -= e), (this.y -= t), this;
        },
        multiply: function (e, t) {
          return (this.x *= e), (this.y *= t), this;
        },
        divide: function (e, t) {
          return (this.x /= e), (this.y /= t), this;
        },
        clampX: function (e, n) {
          return (this.x = t.Math.clamp(this.x, e, n)), this;
        },
        clampY: function (e, n) {
          return (this.y = t.Math.clamp(this.y, e, n)), this;
        },
        clamp: function (e, n) {
          return (
            (this.x = t.Math.clamp(this.x, e, n)),
            (this.y = t.Math.clamp(this.y, e, n)),
            this
          );
        },
        clone: function (e) {
          return (
            "undefined" == typeof e
              ? (e = new t.Point(this.x, this.y))
              : e.setTo(this.x, this.y),
            e
          );
        },
        copyTo: function (e) {
          return (e.x = this.x), (e.y = this.y), e;
        },
        distance: function (e, n) {
          return t.Point.distance(this, e, n);
        },
        equals: function (e) {
          return e.x == this.x && e.y == this.y;
        },
        rotate: function (e, n, r, i, s) {
          return t.Point.rotate(this, e, n, r, i, s);
        },
        getMagnitude: function () {
          return Math.sqrt(this.x * this.x + this.y * this.y);
        },
        setMagnitude: function (e) {
          return this.normalize().multiply(e, e);
        },
        normalize: function () {
          if (!this.isZero()) {
            var e = this.getMagnitude();
            (this.x /= e), (this.y /= e);
          }
          return this;
        },
        isZero: function () {
          return 0 === this.x && 0 === this.y;
        },
        toString: function () {
          return "[{Point (x=" + this.x + " y=" + this.y + ")}]";
        },
      }),
      (t.Point.prototype.constructor = t.Point),
      (t.Point.add = function (e, n, r) {
        return (
          "undefined" == typeof r && (r = new t.Point()),
          (r.x = e.x + n.x),
          (r.y = e.y + n.y),
          r
        );
      }),
      (t.Point.subtract = function (e, n, r) {
        return (
          "undefined" == typeof r && (r = new t.Point()),
          (r.x = e.x - n.x),
          (r.y = e.y - n.y),
          r
        );
      }),
      (t.Point.multiply = function (e, n, r) {
        return (
          "undefined" == typeof r && (r = new t.Point()),
          (r.x = e.x * n.x),
          (r.y = e.y * n.y),
          r
        );
      }),
      (t.Point.divide = function (e, n, r) {
        return (
          "undefined" == typeof r && (r = new t.Point()),
          (r.x = e.x / n.x),
          (r.y = e.y / n.y),
          r
        );
      }),
      (t.Point.equals = function (e, t) {
        return e.x == t.x && e.y == t.y;
      }),
      (t.Point.distance = function (e, n, r) {
        return (
          "undefined" == typeof r && (r = !1),
          r
            ? t.Math.distanceRound(e.x, e.y, n.x, n.y)
            : t.Math.distance(e.x, e.y, n.x, n.y)
        );
      }),
      (t.Point.rotate = function (e, n, r, i, s, o) {
        return (
          (s = s || !1),
          (o = o || null),
          s && (i = t.Math.degToRad(i)),
          null === o &&
            (o = Math.sqrt((n - e.x) * (n - e.x) + (r - e.y) * (r - e.y))),
          e.setTo(n + o * Math.cos(i), r + o * Math.sin(i))
        );
      }),
      (PIXI.Point = t.Point),
      (t.Rectangle = function (e, t, n, r) {
        (e = e || 0),
          (t = t || 0),
          (n = n || 0),
          (r = r || 0),
          (this.x = e),
          (this.y = t),
          (this.width = n),
          (this.height = r);
      }),
      (t.Rectangle.prototype = {
        offset: function (e, t) {
          return (this.x += e), (this.y += t), this;
        },
        offsetPoint: function (e) {
          return this.offset(e.x, e.y);
        },
        setTo: function (e, t, n, r) {
          return (
            (this.x = e),
            (this.y = t),
            (this.width = n),
            (this.height = r),
            this
          );
        },
        floor: function () {
          (this.x = Math.floor(this.x)), (this.y = Math.floor(this.y));
        },
        floorAll: function () {
          (this.x = Math.floor(this.x)),
            (this.y = Math.floor(this.y)),
            (this.width = Math.floor(this.width)),
            (this.height = Math.floor(this.height));
        },
        copyFrom: function (e) {
          return this.setTo(e.x, e.y, e.width, e.height);
        },
        copyTo: function (e) {
          return (
            (e.x = this.x),
            (e.y = this.y),
            (e.width = this.width),
            (e.height = this.height),
            e
          );
        },
        inflate: function (e, n) {
          return t.Rectangle.inflate(this, e, n);
        },
        size: function (e) {
          return t.Rectangle.size(this, e);
        },
        clone: function (e) {
          return t.Rectangle.clone(this, e);
        },
        contains: function (e, n) {
          return t.Rectangle.contains(this, e, n);
        },
        containsRect: function (e) {
          return t.Rectangle.containsRect(this, e);
        },
        equals: function (e) {
          return t.Rectangle.equals(this, e);
        },
        intersection: function (e, n) {
          return t.Rectangle.intersection(this, e, n);
        },
        intersects: function (e, n) {
          return t.Rectangle.intersects(this, e, n);
        },
        intersectsRaw: function (e, n, r, i, s) {
          return t.Rectangle.intersectsRaw(this, e, n, r, i, s);
        },
        union: function (e, n) {
          return t.Rectangle.union(this, e, n);
        },
        toString: function () {
          return (
            "[{Rectangle (x=" +
            this.x +
            " y=" +
            this.y +
            " width=" +
            this.width +
            " height=" +
            this.height +
            " empty=" +
            this.empty +
            ")}]"
          );
        },
      }),
      Object.defineProperty(t.Rectangle.prototype, "halfWidth", {
        get: function () {
          return Math.round(this.width / 2);
        },
      }),
      Object.defineProperty(t.Rectangle.prototype, "halfHeight", {
        get: function () {
          return Math.round(this.height / 2);
        },
      }),
      Object.defineProperty(t.Rectangle.prototype, "bottom", {
        get: function () {
          return this.y + this.height;
        },
        set: function (e) {
          this.height = e <= this.y ? 0 : this.y - e;
        },
      }),
      Object.defineProperty(t.Rectangle.prototype, "bottomRight", {
        get: function () {
          return new t.Point(this.right, this.bottom);
        },
        set: function (e) {
          (this.right = e.x), (this.bottom = e.y);
        },
      }),
      Object.defineProperty(t.Rectangle.prototype, "left", {
        get: function () {
          return this.x;
        },
        set: function (e) {
          (this.width = e >= this.right ? 0 : this.right - e), (this.x = e);
        },
      }),
      Object.defineProperty(t.Rectangle.prototype, "right", {
        get: function () {
          return this.x + this.width;
        },
        set: function (e) {
          this.width = e <= this.x ? 0 : this.x + e;
        },
      }),
      Object.defineProperty(t.Rectangle.prototype, "volume", {
        get: function () {
          return this.width * this.height;
        },
      }),
      Object.defineProperty(t.Rectangle.prototype, "perimeter", {
        get: function () {
          return 2 * this.width + 2 * this.height;
        },
      }),
      Object.defineProperty(t.Rectangle.prototype, "centerX", {
        get: function () {
          return this.x + this.halfWidth;
        },
        set: function (e) {
          this.x = e - this.halfWidth;
        },
      }),
      Object.defineProperty(t.Rectangle.prototype, "centerY", {
        get: function () {
          return this.y + this.halfHeight;
        },
        set: function (e) {
          this.y = e - this.halfHeight;
        },
      }),
      Object.defineProperty(t.Rectangle.prototype, "top", {
        get: function () {
          return this.y;
        },
        set: function (e) {
          e >= this.bottom
            ? ((this.height = 0), (this.y = e))
            : (this.height = this.bottom - e);
        },
      }),
      Object.defineProperty(t.Rectangle.prototype, "topLeft", {
        get: function () {
          return new t.Point(this.x, this.y);
        },
        set: function (e) {
          (this.x = e.x), (this.y = e.y);
        },
      }),
      Object.defineProperty(t.Rectangle.prototype, "empty", {
        get: function () {
          return !this.width || !this.height;
        },
        set: function (e) {
          e === !0 && this.setTo(0, 0, 0, 0);
        },
      }),
      (t.Rectangle.prototype.constructor = t.Rectangle),
      (t.Rectangle.inflate = function (e, t, n) {
        return (
          (e.x -= t), (e.width += 2 * t), (e.y -= n), (e.height += 2 * n), e
        );
      }),
      (t.Rectangle.inflatePoint = function (e, n) {
        return t.Rectangle.inflate(e, n.x, n.y);
      }),
      (t.Rectangle.size = function (e, n) {
        return (
          "undefined" == typeof n
            ? (n = new t.Point(e.width, e.height))
            : n.setTo(e.width, e.height),
          n
        );
      }),
      (t.Rectangle.clone = function (e, n) {
        return (
          "undefined" == typeof n
            ? (n = new t.Rectangle(e.x, e.y, e.width, e.height))
            : n.setTo(e.x, e.y, e.width, e.height),
          n
        );
      }),
      (t.Rectangle.contains = function (e, t, n) {
        return e.width <= 0 || e.height <= 0
          ? !1
          : t >= e.x && t <= e.right && n >= e.y && n <= e.bottom;
      }),
      (t.Rectangle.containsRaw = function (e, t, n, r, i, s) {
        return i >= e && e + n >= i && s >= t && t + r >= s;
      }),
      (t.Rectangle.containsPoint = function (e, n) {
        return t.Rectangle.contains(e, n.x, n.y);
      }),
      (t.Rectangle.containsRect = function (e, t) {
        return e.volume > t.volume
          ? !1
          : e.x >= t.x &&
              e.y >= t.y &&
              e.right <= t.right &&
              e.bottom <= t.bottom;
      }),
      (t.Rectangle.equals = function (e, t) {
        return (
          e.x == t.x && e.y == t.y && e.width == t.width && e.height == t.height
        );
      }),
      (t.Rectangle.intersection = function (e, n, r) {
        return (
          "undefined" == typeof r && (r = new t.Rectangle()),
          t.Rectangle.intersects(e, n) &&
            ((r.x = Math.max(e.x, n.x)),
            (r.y = Math.max(e.y, n.y)),
            (r.width = Math.min(e.right, n.right) - r.x),
            (r.height = Math.min(e.bottom, n.bottom) - r.y)),
          r
        );
      }),
      (t.Rectangle.intersects = function (e, t) {
        return e.width <= 0 || e.height <= 0 || t.width <= 0 || t.height <= 0
          ? !1
          : !(
              e.right < t.x ||
              e.bottom < t.y ||
              e.x > t.right ||
              e.y > t.bottom
            );
      }),
      (t.Rectangle.intersectsRaw = function (e, t, n, r, i, s) {
        return (
          "undefined" == typeof s && (s = 0),
          !(
            t > e.right + s ||
            n < e.left - s ||
            r > e.bottom + s ||
            i < e.top - s
          )
        );
      }),
      (t.Rectangle.union = function (e, n, r) {
        return (
          "undefined" == typeof r && (r = new t.Rectangle()),
          r.setTo(
            Math.min(e.x, n.x),
            Math.min(e.y, n.y),
            Math.max(e.right, n.right) - Math.min(e.left, n.left),
            Math.max(e.bottom, n.bottom) - Math.min(e.top, n.top)
          )
        );
      }),
      (PIXI.Rectangle = t.Rectangle),
      (PIXI.EmptyRectangle = new t.Rectangle(0, 0, 0, 0)),
      (t.Line = function (e, n, r, i) {
        (e = e || 0),
          (n = n || 0),
          (r = r || 0),
          (i = i || 0),
          (this.start = new t.Point(e, n)),
          (this.end = new t.Point(r, i));
      }),
      (t.Line.prototype = {
        setTo: function (e, t, n, r) {
          return this.start.setTo(e, t), this.end.setTo(n, r), this;
        },
        fromSprite: function (e, t, n) {
          return (
            "undefined" == typeof n && (n = !1),
            n
              ? this.setTo(e.center.x, e.center.y, t.center.x, t.center.y)
              : this.setTo(e.x, e.y, t.x, t.y)
          );
        },
        intersects: function (e, n, r) {
          return t.Line.intersectsPoints(
            this.start,
            this.end,
            e.start,
            e.end,
            n,
            r
          );
        },
        pointOnLine: function (e, t) {
          return (
            (e - this.start.x) * (this.end.y - this.end.y) ===
            (this.end.x - this.start.x) * (t - this.end.y)
          );
        },
        pointOnSegment: function (e, t) {
          var n = Math.min(this.start.x, this.end.x),
            r = Math.max(this.start.x, this.end.x),
            i = Math.min(this.start.y, this.end.y),
            s = Math.max(this.start.y, this.end.y);
          return this.pointOnLine(e, t) && e >= n && r >= e && t >= i && s >= t;
        },
        coordinatesOnLine: function (e, t) {
          "undefined" == typeof e && (e = 1),
            "undefined" == typeof t && (t = []);
          var n = Math.round(this.start.x),
            r = Math.round(this.start.y),
            i = Math.round(this.end.x),
            s = Math.round(this.end.y),
            o = Math.abs(i - n),
            u = Math.abs(s - r),
            a = i > n ? 1 : -1,
            f = s > r ? 1 : -1,
            l = o - u;
          t.push([n, r]);
          for (var c = 1; n != i || r != s; ) {
            var h = l << 1;
            h > -u && ((l -= u), (n += a)),
              o > h && ((l += o), (r += f)),
              c % e === 0 && t.push([n, r]),
              c++;
          }
          return t;
        },
      }),
      Object.defineProperty(t.Line.prototype, "length", {
        get: function () {
          return Math.sqrt(
            (this.end.x - this.start.x) * (this.end.x - this.start.x) +
              (this.end.y - this.start.y) * (this.end.y - this.start.y)
          );
        },
      }),
      Object.defineProperty(t.Line.prototype, "angle", {
        get: function () {
          return Math.atan2(
            this.end.x - this.start.x,
            this.end.y - this.start.y
          );
        },
      }),
      Object.defineProperty(t.Line.prototype, "slope", {
        get: function () {
          return (this.end.y - this.start.y) / (this.end.x - this.start.x);
        },
      }),
      Object.defineProperty(t.Line.prototype, "perpSlope", {
        get: function () {
          return -((this.end.x - this.start.x) / (this.end.y - this.start.y));
        },
      }),
      Object.defineProperty(t.Line.prototype, "x", {
        get: function () {
          return Math.min(this.start.x, this.end.x);
        },
      }),
      Object.defineProperty(t.Line.prototype, "y", {
        get: function () {
          return Math.min(this.start.y, this.end.y);
        },
      }),
      Object.defineProperty(t.Line.prototype, "left", {
        get: function () {
          return Math.min(this.start.x, this.end.x);
        },
      }),
      Object.defineProperty(t.Line.prototype, "right", {
        get: function () {
          return Math.max(this.start.x, this.end.x);
        },
      }),
      Object.defineProperty(t.Line.prototype, "top", {
        get: function () {
          return Math.min(this.start.y, this.end.y);
        },
      }),
      Object.defineProperty(t.Line.prototype, "bottom", {
        get: function () {
          return Math.max(this.start.y, this.end.y);
        },
      }),
      Object.defineProperty(t.Line.prototype, "width", {
        get: function () {
          return Math.abs(this.start.x - this.end.x);
        },
      }),
      Object.defineProperty(t.Line.prototype, "height", {
        get: function () {
          return Math.abs(this.start.y - this.end.y);
        },
      }),
      (t.Line.intersectsPoints = function (e, n, r, i, s, o) {
        "undefined" == typeof s && (s = !0),
          "undefined" == typeof o && (o = new t.Point());
        var u = n.y - e.y,
          a = i.y - r.y,
          f = e.x - n.x,
          l = r.x - i.x,
          c = n.x * e.y - e.x * n.y,
          h = i.x * r.y - r.x * i.y,
          p = u * l - a * f;
        if (0 === p) return null;
        if (((o.x = (f * h - l * c) / p), (o.y = (a * c - u * h) / p), s)) {
          if (
            Math.pow(o.x - n.x + (o.y - n.y), 2) >
            Math.pow(e.x - n.x + (e.y - n.y), 2)
          )
            return null;
          if (
            Math.pow(o.x - e.x + (o.y - e.y), 2) >
            Math.pow(e.x - n.x + (e.y - n.y), 2)
          )
            return null;
          if (
            Math.pow(o.x - i.x + (o.y - i.y), 2) >
            Math.pow(r.x - i.x + (r.y - i.y), 2)
          )
            return null;
          if (
            Math.pow(o.x - r.x + (o.y - r.y), 2) >
            Math.pow(r.x - i.x + (r.y - i.y), 2)
          )
            return null;
        }
        return o;
      }),
      (t.Line.intersects = function (e, n, r, i) {
        return t.Line.intersectsPoints(e.start, e.end, n.start, n.end, r, i);
      }),
      (t.Ellipse = function (e, n, r, i) {
        (this.type = t.ELLIPSE),
          (e = e || 0),
          (n = n || 0),
          (r = r || 0),
          (i = i || 0),
          (this.x = e),
          (this.y = n),
          (this.width = r),
          (this.height = i);
      }),
      (t.Ellipse.prototype = {
        setTo: function (e, t, n, r) {
          return (
            (this.x = e),
            (this.y = t),
            (this.width = n),
            (this.height = r),
            this
          );
        },
        copyFrom: function (e) {
          return this.setTo(e.x, e.y, e.width, e.height);
        },
        copyTo: function (e) {
          return (
            (e.x = this.x),
            (e.y = this.y),
            (e.width = this.width),
            (e.height = this.height),
            e
          );
        },
        clone: function (e) {
          return (
            "undefined" == typeof e
              ? (e = new t.Ellipse(this.x, this.y, this.width, this.height))
              : e.setTo(this.x, this.y, this.width, this.height),
            e
          );
        },
        contains: function (e, n) {
          return t.Ellipse.contains(this, e, n);
        },
        toString: function () {
          return (
            "[{Phaser.Ellipse (x=" +
            this.x +
            " y=" +
            this.y +
            " width=" +
            this.width +
            " height=" +
            this.height +
            ")}]"
          );
        },
      }),
      (t.Ellipse.prototype.constructor = t.Ellipse),
      Object.defineProperty(t.Ellipse.prototype, "left", {
        get: function () {
          return this.x;
        },
        set: function (e) {
          this.x = e;
        },
      }),
      Object.defineProperty(t.Ellipse.prototype, "right", {
        get: function () {
          return this.x + this.width;
        },
        set: function (e) {
          this.width = e < this.x ? 0 : this.x + e;
        },
      }),
      Object.defineProperty(t.Ellipse.prototype, "top", {
        get: function () {
          return this.y;
        },
        set: function (e) {
          this.y = e;
        },
      }),
      Object.defineProperty(t.Ellipse.prototype, "bottom", {
        get: function () {
          return this.y + this.height;
        },
        set: function (e) {
          this.height = e < this.y ? 0 : this.y + e;
        },
      }),
      Object.defineProperty(t.Ellipse.prototype, "empty", {
        get: function () {
          return 0 === this.width || 0 === this.height;
        },
        set: function (e) {
          e === !0 && this.setTo(0, 0, 0, 0);
        },
      }),
      (t.Ellipse.contains = function (e, t, n) {
        if (e.width <= 0 || e.height <= 0) return !1;
        var r = (t - e.x) / e.width - 0.5,
          i = (n - e.y) / e.height - 0.5;
        return (r *= r), (i *= i), 0.25 > r + i;
      }),
      (t.Ellipse.prototype.getBounds = function () {
        return new t.Rectangle(this.x, this.y, this.width, this.height);
      }),
      (PIXI.Ellipse = t.Ellipse),
      (t.Polygon = function (e) {
        if (
          ((this.type = t.POLYGON),
          e instanceof Array || (e = Array.prototype.slice.call(arguments)),
          "number" == typeof e[0])
        ) {
          for (var n = [], r = 0, i = e.length; i > r; r += 2)
            n.push(new t.Point(e[r], e[r + 1]));
          e = n;
        }
        this.points = e;
      }),
      (t.Polygon.prototype = {
        clone: function () {
          for (var e = [], n = 0; n < this.points.length; n++)
            e.push(this.points[n].clone());
          return new t.Polygon(e);
        },
        contains: function (e, t) {
          for (
            var n = !1, r = 0, i = this.points.length - 1;
            r < this.points.length;
            i = r++
          ) {
            var s = this.points[r].x,
              o = this.points[r].y,
              u = this.points[i].x,
              a = this.points[i].y,
              f = o > t != a > t && ((u - s) * (t - o)) / (a - o) + s > e;
            f && (n = !0);
          }
          return n;
        },
      }),
      (t.Polygon.prototype.constructor = t.Polygon),
      (PIXI.Polygon = t.Polygon),
      (t.Camera = function (e, n, r, i, s, o) {
        (this.game = e),
          (this.world = e.world),
          (this.id = 0),
          (this.view = new t.Rectangle(r, i, s, o)),
          (this.screenView = new t.Rectangle(r, i, s, o)),
          (this.bounds = new t.Rectangle(r, i, s, o)),
          (this.deadzone = null),
          (this.visible = !0),
          (this.atLimit = { x: !1, y: !1 }),
          (this.target = null),
          (this._edge = 0),
          (this.displayObject = null),
          (this.scale = null);
      }),
      (t.Camera.FOLLOW_LOCKON = 0),
      (t.Camera.FOLLOW_PLATFORMER = 1),
      (t.Camera.FOLLOW_TOPDOWN = 2),
      (t.Camera.FOLLOW_TOPDOWN_TIGHT = 3),
      (t.Camera.prototype = {
        follow: function (e, n) {
          "undefined" == typeof n && (n = t.Camera.FOLLOW_LOCKON),
            (this.target = e);
          var r;
          switch (n) {
            case t.Camera.FOLLOW_PLATFORMER:
              var i = this.width / 8,
                s = this.height / 3;
              this.deadzone = new t.Rectangle(
                (this.width - i) / 2,
                (this.height - s) / 2 - 0.25 * s,
                i,
                s
              );
              break;
            case t.Camera.FOLLOW_TOPDOWN:
              (r = Math.max(this.width, this.height) / 4),
                (this.deadzone = new t.Rectangle(
                  (this.width - r) / 2,
                  (this.height - r) / 2,
                  r,
                  r
                ));
              break;
            case t.Camera.FOLLOW_TOPDOWN_TIGHT:
              (r = Math.max(this.width, this.height) / 8),
                (this.deadzone = new t.Rectangle(
                  (this.width - r) / 2,
                  (this.height - r) / 2,
                  r,
                  r
                ));
              break;
            case t.Camera.FOLLOW_LOCKON:
              this.deadzone = null;
              break;
            default:
              this.deadzone = null;
          }
        },
        focusOn: function (e) {
          this.setPosition(
            Math.round(e.x - this.view.halfWidth),
            Math.round(e.y - this.view.halfHeight)
          );
        },
        focusOnXY: function (e, t) {
          this.setPosition(
            Math.round(e - this.view.halfWidth),
            Math.round(t - this.view.halfHeight)
          );
        },
        update: function () {
          this.target && this.updateTarget(),
            this.bounds && this.checkBounds(),
            (this.displayObject.position.x = -this.view.x),
            (this.displayObject.position.y = -this.view.y);
        },
        updateTarget: function () {
          this.deadzone
            ? ((this._edge = this.target.x - this.deadzone.x),
              this.view.x > this._edge && (this.view.x = this._edge),
              (this._edge =
                this.target.x +
                this.target.width -
                this.deadzone.x -
                this.deadzone.width),
              this.view.x < this._edge && (this.view.x = this._edge),
              (this._edge = this.target.y - this.deadzone.y),
              this.view.y > this._edge && (this.view.y = this._edge),
              (this._edge =
                this.target.y +
                this.target.height -
                this.deadzone.y -
                this.deadzone.height),
              this.view.y < this._edge && (this.view.y = this._edge))
            : this.focusOnXY(this.target.x, this.target.y);
        },
        setBoundsToWorld: function () {
          this.bounds.setTo(
            this.game.world.bounds.x,
            this.game.world.bounds.y,
            this.game.world.bounds.width,
            this.game.world.bounds.height
          );
        },
        checkBounds: function () {
          (this.atLimit.x = !1),
            (this.atLimit.y = !1),
            this.view.x <= this.bounds.x &&
              ((this.atLimit.x = !0), (this.view.x = this.bounds.x)),
            this.view.right >= this.bounds.right &&
              ((this.atLimit.x = !0),
              (this.view.x = this.bounds.right - this.width)),
            this.view.y <= this.bounds.top &&
              ((this.atLimit.y = !0), (this.view.y = this.bounds.top)),
            this.view.bottom >= this.bounds.bottom &&
              ((this.atLimit.y = !0),
              (this.view.y = this.bounds.bottom - this.height)),
            this.view.floor();
        },
        setPosition: function (e, t) {
          (this.view.x = e),
            (this.view.y = t),
            this.bounds && this.checkBounds();
        },
        setSize: function (e, t) {
          (this.view.width = e), (this.view.height = t);
        },
        reset: function () {
          (this.target = null), (this.view.x = 0), (this.view.y = 0);
        },
      }),
      (t.Camera.prototype.constructor = t.Camera),
      Object.defineProperty(t.Camera.prototype, "x", {
        get: function () {
          return this.view.x;
        },
        set: function (e) {
          (this.view.x = e), this.bounds && this.checkBounds();
        },
      }),
      Object.defineProperty(t.Camera.prototype, "y", {
        get: function () {
          return this.view.y;
        },
        set: function (e) {
          (this.view.y = e), this.bounds && this.checkBounds();
        },
      }),
      Object.defineProperty(t.Camera.prototype, "width", {
        get: function () {
          return this.view.width;
        },
        set: function (e) {
          this.view.width = e;
        },
      }),
      Object.defineProperty(t.Camera.prototype, "height", {
        get: function () {
          return this.view.height;
        },
        set: function (e) {
          this.view.height = e;
        },
      }),
      (t.State = function () {
        (this.game = null),
          (this.add = null),
          (this.make = null),
          (this.camera = null),
          (this.cache = null),
          (this.input = null),
          (this.load = null),
          (this.math = null),
          (this.sound = null),
          (this.scale = null),
          (this.stage = null),
          (this.time = null),
          (this.tweens = null),
          (this.world = null),
          (this.particles = null),
          (this.physics = null),
          (this.rnd = null);
      }),
      (t.State.prototype = {
        preload: function () {},
        loadUpdate: function () {},
        loadRender: function () {},
        create: function () {},
        update: function () {},
        render: function () {},
        paused: function () {},
        shutdown: function () {},
      }),
      (t.State.prototype.constructor = t.State),
      (t.StateManager = function (e, t) {
        (this.game = e),
          (this.states = {}),
          (this._pendingState = null),
          "undefined" != typeof t && null !== t && (this._pendingState = t),
          (this._clearWorld = !1),
          (this._clearCache = !1),
          (this._created = !1),
          (this._args = []),
          (this.current = ""),
          (this.onInitCallback = null),
          (this.onPreloadCallback = null),
          (this.onCreateCallback = null),
          (this.onUpdateCallback = null),
          (this.onRenderCallback = null),
          (this.onPreRenderCallback = null),
          (this.onLoadUpdateCallback = null),
          (this.onLoadRenderCallback = null),
          (this.onPausedCallback = null),
          (this.onResumedCallback = null),
          (this.onShutDownCallback = null);
      }),
      (t.StateManager.prototype = {
        boot: function () {
          this.game.onPause.add(this.pause, this),
            this.game.onResume.add(this.resume, this),
            this.game.load.onLoadComplete.add(this.loadComplete, this),
            null !== this._pendingState &&
              ("string" == typeof this._pendingState
                ? this.start(this._pendingState, !1, !1)
                : this.add("default", this._pendingState, !0));
        },
        add: function (e, n, r) {
          "undefined" == typeof r && (r = !1);
          var i;
          return (
            n instanceof t.State
              ? (i = n)
              : "object" == typeof n
              ? ((i = n), (i.game = this.game))
              : "function" == typeof n && (i = new n(this.game)),
            (this.states[e] = i),
            r &&
              (this.game.isBooted ? this.start(e) : (this._pendingState = e)),
            i
          );
        },
        remove: function (e) {
          this.current == e &&
            ((this.callbackContext = null),
            (this.onInitCallback = null),
            (this.onShutDownCallback = null),
            (this.onPreloadCallback = null),
            (this.onLoadRenderCallback = null),
            (this.onLoadUpdateCallback = null),
            (this.onCreateCallback = null),
            (this.onUpdateCallback = null),
            (this.onRenderCallback = null),
            (this.onPausedCallback = null),
            (this.onResumedCallback = null),
            (this.onDestroyCallback = null)),
            delete this.states[e];
        },
        start: function (e, t, n) {
          "undefined" == typeof t && (t = !0),
            "undefined" == typeof n && (n = !1),
            this.checkState(e) &&
              ((this._pendingState = e),
              (this._clearWorld = t),
              (this._clearCache = n),
              arguments.length > 3 &&
                (this._args = Array.prototype.splice.call(arguments, 3)));
        },
        dummy: function () {},
        preUpdate: function () {
          this._pendingState &&
            this.game.isBooted &&
            (this.current &&
              (this.onShutDownCallback.call(this.callbackContext, this.game),
              this.game.tweens.removeAll(),
              this.game.camera.reset(),
              this.game.input.reset(!0),
              this.game.physics.clear(),
              this.game.time.removeAll(),
              this._clearWorld &&
                (this.game.world.shutdown(),
                this._clearCache === !0 && this.game.cache.destroy())),
            this.setCurrentState(this._pendingState),
            this.onPreloadCallback
              ? (this.game.load.reset(),
                this.onPreloadCallback.call(this.callbackContext, this.game),
                0 === this.game.load.totalQueuedFiles()
                  ? this.loadComplete()
                  : this.game.load.start())
              : this.loadComplete(),
            this.current === this._pendingState && (this._pendingState = null));
        },
        checkState: function (e) {
          if (this.states[e]) {
            var t = !1;
            return (
              this.states[e].preload && (t = !0),
              this.states[e].create && (t = !0),
              this.states[e].update && (t = !0),
              this.states[e].render && (t = !0),
              t === !1
                ? (console.warn(
                    "Invalid Phaser State object given. Must contain at least a one of the required functions: preload, create, update or render"
                  ),
                  !1)
                : !0
            );
          }
          return (
            console.warn(
              "Phaser.StateManager - No state found with the key: " + e
            ),
            !1
          );
        },
        link: function (e) {
          (this.states[e].game = this.game),
            (this.states[e].add = this.game.add),
            (this.states[e].make = this.game.make),
            (this.states[e].camera = this.game.camera),
            (this.states[e].cache = this.game.cache),
            (this.states[e].input = this.game.input),
            (this.states[e].load = this.game.load),
            (this.states[e].math = this.game.math),
            (this.states[e].sound = this.game.sound),
            (this.states[e].scale = this.game.scale),
            (this.states[e].state = this),
            (this.states[e].stage = this.game.stage),
            (this.states[e].time = this.game.time),
            (this.states[e].tweens = this.game.tweens),
            (this.states[e].world = this.game.world),
            (this.states[e].particles = this.game.particles),
            (this.states[e].rnd = this.game.rnd),
            (this.states[e].physics = this.game.physics);
        },
        setCurrentState: function (e) {
          (this.callbackContext = this.states[e]),
            this.link(e),
            (this.onInitCallback = this.states[e].init || this.dummy),
            (this.onPreloadCallback = this.states[e].preload || null),
            (this.onLoadRenderCallback = this.states[e].loadRender || null),
            (this.onLoadUpdateCallback = this.states[e].loadUpdate || null),
            (this.onCreateCallback = this.states[e].create || null),
            (this.onUpdateCallback = this.states[e].update || null),
            (this.onPreRenderCallback = this.states[e].preRender || null),
            (this.onRenderCallback = this.states[e].render || null),
            (this.onPausedCallback = this.states[e].paused || null),
            (this.onResumedCallback = this.states[e].resumed || null),
            (this.onShutDownCallback = this.states[e].shutdown || this.dummy),
            (this.current = e),
            (this._created = !1),
            this.onInitCallback.apply(this.callbackContext, this._args),
            (this._args = []);
        },
        getCurrentState: function () {
          return this.states[this.current];
        },
        loadComplete: function () {
          this._created === !1 && this.onCreateCallback
            ? ((this._created = !0),
              this.onCreateCallback.call(this.callbackContext, this.game))
            : (this._created = !0);
        },
        pause: function () {
          this._created &&
            this.onPausedCallback &&
            this.onPausedCallback.call(this.callbackContext, this.game);
        },
        resume: function () {
          this._created &&
            this.onResumedCallback &&
            this.onResumedCallback.call(this.callbackContext, this.game);
        },
        update: function () {
          this._created && this.onUpdateCallback
            ? this.onUpdateCallback.call(this.callbackContext, this.game)
            : this.onLoadUpdateCallback &&
              this.onLoadUpdateCallback.call(this.callbackContext, this.game);
        },
        preRender: function () {
          this.onPreRenderCallback &&
            this.onPreRenderCallback.call(this.callbackContext, this.game);
        },
        render: function () {
          this._created && this.onRenderCallback
            ? (this.game.renderType === t.CANVAS &&
                (this.game.context.save(),
                this.game.context.setTransform(1, 0, 0, 1, 0, 0)),
              this.onRenderCallback.call(this.callbackContext, this.game),
              this.game.renderType === t.CANVAS && this.game.context.restore())
            : this.onLoadRenderCallback &&
              this.onLoadRenderCallback.call(this.callbackContext, this.game);
        },
        destroy: function () {
          (this.callbackContext = null),
            (this.onInitCallback = null),
            (this.onShutDownCallback = null),
            (this.onPreloadCallback = null),
            (this.onLoadRenderCallback = null),
            (this.onLoadUpdateCallback = null),
            (this.onCreateCallback = null),
            (this.onUpdateCallback = null),
            (this.onRenderCallback = null),
            (this.onPausedCallback = null),
            (this.onResumedCallback = null),
            (this.onDestroyCallback = null),
            (this.game = null),
            (this.states = {}),
            (this._pendingState = null);
        },
      }),
      (t.StateManager.prototype.constructor = t.StateManager),
      (t.LinkedList = function () {
        (this.next = null),
          (this.prev = null),
          (this.first = null),
          (this.last = null),
          (this.total = 0);
      }),
      (t.LinkedList.prototype = {
        add: function (e) {
          return 0 === this.total && null == this.first && null == this.last
            ? ((this.first = e),
              (this.last = e),
              (this.next = e),
              (e.prev = this),
              this.total++,
              e)
            : ((this.last.next = e),
              (e.prev = this.last),
              (this.last = e),
              this.total++,
              e);
        },
        remove: function (e) {
          e == this.first
            ? (this.first = this.first.next)
            : e == this.last && (this.last = this.last.prev),
            e.prev && (e.prev.next = e.next),
            e.next && (e.next.prev = e.prev),
            (e.next = e.prev = null),
            null == this.first && (this.last = null),
            this.total--;
        },
        callAll: function (e) {
          if (this.first && this.last) {
            var t = this.first;
            do t && t[e] && t[e].call(t), (t = t.next);
            while (t != this.last.next);
          }
        },
      }),
      (t.LinkedList.prototype.constructor = t.LinkedList),
      (t.Signal = function () {
        (this._bindings = []), (this._prevParams = null);
        var e = this;
        this.dispatch = function () {
          t.Signal.prototype.dispatch.apply(e, arguments);
        };
      }),
      (t.Signal.prototype = {
        memorize: !1,
        _shouldPropagate: !0,
        active: !0,
        validateListener: function (e, t) {
          if ("function" != typeof e)
            throw new Error(
              "listener is a required param of {fn}() and should be a Function.".replace(
                "{fn}",
                t
              )
            );
        },
        _registerListener: function (e, n, r, i) {
          var s,
            o = this._indexOfListener(e, r);
          if (-1 !== o) {
            if (((s = this._bindings[o]), s.isOnce() !== n))
              throw new Error(
                "You cannot add" +
                  (n ? "" : "Once") +
                  "() then add" +
                  (n ? "Once" : "") +
                  "() the same listener without removing the relationship first."
              );
          } else
            (s = new t.SignalBinding(this, e, n, r, i)), this._addBinding(s);
          return (
            this.memorize && this._prevParams && s.execute(this._prevParams), s
          );
        },
        _addBinding: function (e) {
          var t = this._bindings.length;
          do --t;
          while (
            this._bindings[t] &&
            e._priority <= this._bindings[t]._priority
          );
          this._bindings.splice(t + 1, 0, e);
        },
        _indexOfListener: function (e, t) {
          for (var n, r = this._bindings.length; r--; )
            if (((n = this._bindings[r]), n._listener === e && n.context === t))
              return r;
          return -1;
        },
        has: function (e, t) {
          return -1 !== this._indexOfListener(e, t);
        },
        add: function (e, t, n) {
          return (
            this.validateListener(e, "add"), this._registerListener(e, !1, t, n)
          );
        },
        addOnce: function (e, t, n) {
          return (
            this.validateListener(e, "addOnce"),
            this._registerListener(e, !0, t, n)
          );
        },
        remove: function (e, t) {
          this.validateListener(e, "remove");
          var n = this._indexOfListener(e, t);
          return (
            -1 !== n &&
              (this._bindings[n]._destroy(), this._bindings.splice(n, 1)),
            e
          );
        },
        removeAll: function () {
          for (var e = this._bindings.length; e--; )
            this._bindings[e]._destroy();
          this._bindings.length = 0;
        },
        getNumListeners: function () {
          return this._bindings.length;
        },
        halt: function () {
          this._shouldPropagate = !1;
        },
        dispatch: function () {
          if (this.active) {
            var e,
              t = Array.prototype.slice.call(arguments),
              n = this._bindings.length;
            if ((this.memorize && (this._prevParams = t), n)) {
              (e = this._bindings.slice()), (this._shouldPropagate = !0);
              do n--;
              while (e[n] && this._shouldPropagate && e[n].execute(t) !== !1);
            }
          }
        },
        forget: function () {
          this._prevParams = null;
        },
        dispose: function () {
          this.removeAll(), delete this._bindings, delete this._prevParams;
        },
        toString: function () {
          return (
            "[Phaser.Signal active:" +
            this.active +
            " numListeners:" +
            this.getNumListeners() +
            "]"
          );
        },
      }),
      (t.Signal.prototype.constructor = t.Signal),
      (t.SignalBinding = function (e, t, n, r, i) {
        (this._listener = t),
          (this._isOnce = n),
          (this.context = r),
          (this._signal = e),
          (this._priority = i || 0);
      }),
      (t.SignalBinding.prototype = {
        active: !0,
        params: null,
        execute: function (e) {
          var t, n;
          return (
            this.active &&
              this._listener &&
              ((n = this.params ? this.params.concat(e) : e),
              (t = this._listener.apply(this.context, n)),
              this._isOnce && this.detach()),
            t
          );
        },
        detach: function () {
          return this.isBound()
            ? this._signal.remove(this._listener, this.context)
            : null;
        },
        isBound: function () {
          return !!this._signal && !!this._listener;
        },
        isOnce: function () {
          return this._isOnce;
        },
        getListener: function () {
          return this._listener;
        },
        getSignal: function () {
          return this._signal;
        },
        _destroy: function () {
          delete this._signal, delete this._listener, delete this.context;
        },
        toString: function () {
          return (
            "[Phaser.SignalBinding isOnce:" +
            this._isOnce +
            ", isBound:" +
            this.isBound() +
            ", active:" +
            this.active +
            "]"
          );
        },
      }),
      (t.SignalBinding.prototype.constructor = t.SignalBinding),
      (t.Filter = function (e, n, r) {
        (this.game = e),
          (this.type = t.WEBGL_FILTER),
          (this.passes = [this]),
          (this.shaders = []),
          (this.dirty = !0),
          (this.padding = 0),
          (this.uniforms = {
            time: { type: "1f", value: 0 },
            resolution: { type: "2f", value: { x: 256, y: 256 } },
            mouse: { type: "2f", value: { x: 0, y: 0 } },
          }),
          (this.fragmentSrc = r || []);
      }),
      (t.Filter.prototype = {
        init: function () {},
        setResolution: function (e, t) {
          (this.uniforms.resolution.value.x = e),
            (this.uniforms.resolution.value.y = t);
        },
        update: function (e) {
          "undefined" != typeof e &&
            (e.x > 0 && (this.uniforms.mouse.x = e.x.toFixed(2)),
            e.y > 0 && (this.uniforms.mouse.y = e.y.toFixed(2))),
            (this.uniforms.time.value = this.game.time.totalElapsedSeconds());
        },
        destroy: function () {
          this.game = null;
        },
      }),
      (t.Filter.prototype.constructor = t.Filter),
      Object.defineProperty(t.Filter.prototype, "width", {
        get: function () {
          return this.uniforms.resolution.value.x;
        },
        set: function (e) {
          this.uniforms.resolution.value.x = e;
        },
      }),
      Object.defineProperty(t.Filter.prototype, "height", {
        get: function () {
          return this.uniforms.resolution.value.y;
        },
        set: function (e) {
          this.uniforms.resolution.value.y = e;
        },
      }),
      (t.Plugin = function (e, t) {
        "undefined" == typeof t && (t = null),
          (this.game = e),
          (this.parent = t),
          (this.active = !1),
          (this.visible = !1),
          (this.hasPreUpdate = !1),
          (this.hasUpdate = !1),
          (this.hasPostUpdate = !1),
          (this.hasRender = !1),
          (this.hasPostRender = !1);
      }),
      (t.Plugin.prototype = {
        preUpdate: function () {},
        update: function () {},
        render: function () {},
        postRender: function () {},
        destroy: function () {
          (this.game = null),
            (this.parent = null),
            (this.active = !1),
            (this.visible = !1);
        },
      }),
      (t.Plugin.prototype.constructor = t.Plugin),
      (t.PluginManager = function (e, t) {
        (this.game = e),
          (this._parent = t),
          (this.plugins = []),
          (this._pluginsLength = 0);
      }),
      (t.PluginManager.prototype = {
        add: function (e) {
          var t = !1;
          return (
            "function" == typeof e
              ? (e = new e(this.game, this._parent))
              : ((e.game = this.game), (e.parent = this._parent)),
            "function" == typeof e.preUpdate &&
              ((e.hasPreUpdate = !0), (t = !0)),
            "function" == typeof e.update && ((e.hasUpdate = !0), (t = !0)),
            "function" == typeof e.postUpdate &&
              ((e.hasPostUpdate = !0), (t = !0)),
            "function" == typeof e.render && ((e.hasRender = !0), (t = !0)),
            "function" == typeof e.postRender &&
              ((e.hasPostRender = !0), (t = !0)),
            t
              ? ((e.hasPreUpdate || e.hasUpdate || e.hasPostUpdate) &&
                  (e.active = !0),
                (e.hasRender || e.hasPostRender) && (e.visible = !0),
                (this._pluginsLength = this.plugins.push(e)),
                "function" == typeof e.init && e.init(),
                e)
              : null
          );
        },
        remove: function (e) {
          if (0 !== this._pluginsLength)
            for (this._p = 0; this._p < this._pluginsLength; this._p++)
              if (this.plugins[this._p] === e)
                return (
                  e.destroy(),
                  this.plugins.splice(this._p, 1),
                  void this._pluginsLength--
                );
        },
        removeAll: function () {
          for (this._p = 0; this._p < this._pluginsLength; this._p++)
            this.plugins[this._p].destroy();
          (this.plugins.length = 0), (this._pluginsLength = 0);
        },
        preUpdate: function () {
          if (0 !== this._pluginsLength)
            for (this._p = 0; this._p < this._pluginsLength; this._p++)
              this.plugins[this._p].active &&
                this.plugins[this._p].hasPreUpdate &&
                this.plugins[this._p].preUpdate();
        },
        update: function () {
          if (0 !== this._pluginsLength)
            for (this._p = 0; this._p < this._pluginsLength; this._p++)
              this.plugins[this._p].active &&
                this.plugins[this._p].hasUpdate &&
                this.plugins[this._p].update();
        },
        postUpdate: function () {
          if (0 !== this._pluginsLength)
            for (this._p = 0; this._p < this._pluginsLength; this._p++)
              this.plugins[this._p].active &&
                this.plugins[this._p].hasPostUpdate &&
                this.plugins[this._p].postUpdate();
        },
        render: function () {
          if (0 !== this._pluginsLength)
            for (this._p = 0; this._p < this._pluginsLength; this._p++)
              this.plugins[this._p].visible &&
                this.plugins[this._p].hasRender &&
                this.plugins[this._p].render();
        },
        postRender: function () {
          if (0 !== this._pluginsLength)
            for (this._p = 0; this._p < this._pluginsLength; this._p++)
              this.plugins[this._p].visible &&
                this.plugins[this._p].hasPostRender &&
                this.plugins[this._p].postRender();
        },
        destroy: function () {
          (this.plugins.length = 0),
            (this._pluginsLength = 0),
            (this.game = null),
            (this._parent = null);
        },
      }),
      (t.PluginManager.prototype.constructor = t.PluginManager),
      (t.Stage = function (e, n, r) {
        (this.game = e),
          (this.offset = new t.Point()),
          PIXI.Stage.call(this, 0, !1),
          (this.name = "_stage_root"),
          (this.interactive = !1),
          (this.disableVisibilityChange = !1),
          (this.checkOffsetInterval = 2500),
          (this.exists = !0),
          (this.currentRenderOrderID = 0),
          (this._hiddenVar = "hidden"),
          (this._nextOffsetCheck = 0),
          (this._backgroundColor = 0),
          e.config
            ? this.parseConfig(e.config)
            : ((this.game.canvas = t.Canvas.create(n, r)),
              (this.game.canvas.style["-webkit-full-screen"] =
                "width: 100%; height: 100%"));
      }),
      (t.Stage.prototype = Object.create(PIXI.Stage.prototype)),
      (t.Stage.prototype.constructor = t.Stage),
      (t.Stage.prototype.preUpdate = function () {
        this.currentRenderOrderID = 0;
        for (var e = this.children.length, t = 0; e > t; t++)
          this.children[t].preUpdate();
      }),
      (t.Stage.prototype.update = function () {
        for (var e = this.children.length; e--; ) this.children[e].update();
      }),
      (t.Stage.prototype.postUpdate = function () {
        if (this.game.world.camera.target) {
          this.game.world.camera.target.postUpdate(),
            this.game.world.camera.update();
          for (var e = this.children.length; e--; )
            this.children[e] !== this.game.world.camera.target &&
              this.children[e].postUpdate();
        } else {
          this.game.world.camera.update();
          for (var e = this.children.length; e--; )
            this.children[e].postUpdate();
        }
        this.checkOffsetInterval !== !1 &&
          this.game.time.now > this._nextOffsetCheck &&
          (t.Canvas.getOffset(this.game.canvas, this.offset),
          (this._nextOffsetCheck =
            this.game.time.now + this.checkOffsetInterval));
      }),
      (t.Stage.prototype.parseConfig = function (e) {
        (this.game.canvas = e.canvasID
          ? t.Canvas.create(this.game.width, this.game.height, e.canvasID)
          : t.Canvas.create(this.game.width, this.game.height)),
          e.canvasStyle
            ? (this.game.canvas.stlye = e.canvasStyle)
            : (this.game.canvas.style["-webkit-full-screen"] =
                "width: 100%; height: 100%"),
          e.checkOffsetInterval &&
            (this.checkOffsetInterval = e.checkOffsetInterval),
          e.disableVisibilityChange &&
            (this.disableVisibilityChange = e.disableVisibilityChange),
          e.fullScreenScaleMode &&
            (this.fullScreenScaleMode = e.fullScreenScaleMode),
          e.scaleMode && (this.scaleMode = e.scaleMode),
          e.backgroundColor && (this.backgroundColor = e.backgroundColor);
      }),
      (t.Stage.prototype.boot = function () {
        t.Canvas.getOffset(this.game.canvas, this.offset),
          (this.bounds = new t.Rectangle(
            this.offset.x,
            this.offset.y,
            this.game.width,
            this.game.height
          ));
        var e = this;
        (this._onChange = function (t) {
          return e.visibilityChange(t);
        }),
          t.Canvas.setUserSelect(this.game.canvas, "none"),
          t.Canvas.setTouchAction(this.game.canvas, "none"),
          this.checkVisibility();
      }),
      (t.Stage.prototype.checkVisibility = function () {
        (this._hiddenVar =
          void 0 !== document.webkitHidden
            ? "webkitvisibilitychange"
            : void 0 !== document.mozHidden
            ? "mozvisibilitychange"
            : void 0 !== document.msHidden
            ? "msvisibilitychange"
            : void 0 !== document.hidden
            ? "visibilitychange"
            : null),
          this._hiddenVar &&
            document.addEventListener(this._hiddenVar, this._onChange, !1),
          (window.onpagehide = this._onChange),
          (window.onpageshow = this._onChange),
          (window.onblur = this._onChange),
          (window.onfocus = this._onChange);
      }),
      (t.Stage.prototype.visibilityChange = function (e) {
        return this.disableVisibilityChange
          ? void 0
          : "pagehide" === e.type ||
            "blur" === e.type ||
            "pageshow" === e.type ||
            "focus" === e.type
          ? void ("pagehide" === e.type || "blur" === e.type
              ? this.game.focusLoss(e)
              : ("pageshow" === e.type || "focus" === e.type) &&
                this.game.focusGain(e))
          : void (document.hidden ||
            document.mozHidden ||
            document.msHidden ||
            document.webkitHidden
              ? this.game.gamePaused(e)
              : this.game.gameResumed(e));
      }),
      (t.Stage.prototype.setBackgroundColor = function (e) {
        (this._backgroundColor = e || 0),
          (this.backgroundColorSplit = PIXI.hex2rgb(this.backgroundColor));
        var t = this._backgroundColor.toString(16);
        (t = "000000".substr(0, 6 - t.length) + t),
          (this.backgroundColorString = "#" + t);
      }),
      Object.defineProperty(t.Stage.prototype, "backgroundColor", {
        get: function () {
          return this._backgroundColor;
        },
        set: function (e) {
          (this._backgroundColor = e),
            this.game.transparent === !1 &&
              ("string" == typeof e && (e = t.Color.hexToRGB(e)),
              this.setBackgroundColor(e));
        },
      }),
      Object.defineProperty(t.Stage.prototype, "smoothed", {
        get: function () {
          return !PIXI.scaleModes.LINEAR;
        },
        set: function (e) {
          PIXI.scaleModes.LINEAR = e ? 0 : 1;
        },
      }),
      (t.Group = function (e, n, r, i, s, o) {
        "undefined" == typeof i && (i = !1),
          "undefined" == typeof s && (s = !1),
          "undefined" == typeof o && (o = t.Physics.ARCADE),
          (this.game = e),
          "undefined" == typeof n && (n = e.world),
          (this.name = r || "group"),
          PIXI.DisplayObjectContainer.call(this),
          i ? this.game.stage.addChild(this) : n && n.addChild(this),
          (this.z = 0),
          (this.type = t.GROUP),
          (this.alive = !0),
          (this.exists = !0),
          (this.scale = new t.Point(1, 1)),
          (this.cursor = null),
          (this.cameraOffset = new t.Point()),
          (this.enableBody = s),
          (this.enableBodyDebug = !1),
          (this.physicsBodyType = o),
          (this._sortProperty = "z"),
          (this._cache = [0, 0, 0, 0, 1, 0, 1, 0, 0, 0]);
      }),
      (t.Group.prototype = Object.create(
        PIXI.DisplayObjectContainer.prototype
      )),
      (t.Group.prototype.constructor = t.Group),
      (t.Group.RETURN_NONE = 0),
      (t.Group.RETURN_TOTAL = 1),
      (t.Group.RETURN_CHILD = 2),
      (t.Group.SORT_ASCENDING = -1),
      (t.Group.SORT_DESCENDING = 1),
      (t.Group.prototype.add = function (e) {
        return (
          e.parent !== this &&
            (this.enableBody &&
              this.game.physics.enable(e, this.physicsBodyType),
            this.addChild(e),
            (e.z = this.children.length),
            e.events && e.events.onAddedToGroup.dispatch(e, this),
            null === this.cursor && (this.cursor = e)),
          e
        );
      }),
      (t.Group.prototype.addAt = function (e, t) {
        return (
          e.parent !== this &&
            (this.enableBody &&
              this.game.physics.enable(e, this.physicsBodyType),
            this.addChildAt(e, t),
            this.updateZ(),
            e.events && e.events.onAddedToGroup.dispatch(e, this),
            null === this.cursor && (this.cursor = e)),
          e
        );
      }),
      (t.Group.prototype.getAt = function (e) {
        return 0 > e || e >= this.children.length ? -1 : this.getChildAt(e);
      }),
      (t.Group.prototype.create = function (e, n, r, i, s) {
        "undefined" == typeof s && (s = !0);
        var o = new t.Sprite(this.game, e, n, r, i);
        return (
          this.enableBody && this.game.physics.enable(o, this.physicsBodyType),
          (o.exists = s),
          (o.visible = s),
          (o.alive = s),
          this.addChild(o),
          (o.z = this.children.length),
          o.events && o.events.onAddedToGroup.dispatch(o, this),
          null === this.cursor && (this.cursor = o),
          o
        );
      }),
      (t.Group.prototype.createMultiple = function (e, t, n, r) {
        "undefined" == typeof r && (r = !1);
        for (var i = 0; e > i; i++) this.create(0, 0, t, n, r);
      }),
      (t.Group.prototype.updateZ = function () {
        for (var e = this.children.length; e--; ) this.children[e].z = e;
      }),
      (t.Group.prototype.next = function () {
        this.cursor &&
          (this._cache[8] === this.children.length
            ? (this._cache[8] = 0)
            : this._cache[8]++,
          (this.cursor = this.children[this._cache[8]]));
      }),
      (t.Group.prototype.previous = function () {
        this.cursor &&
          (0 === this._cache[8]
            ? (this._cache[8] = this.children.length - 1)
            : this._cache[8]--,
          (this.cursor = this.children[this._cache[8]]));
      }),
      (t.Group.prototype.swap = function (e, t) {
        var n = this.swapChildren(e, t);
        return n && this.updateZ(), n;
      }),
      (t.Group.prototype.bringToTop = function (e) {
        return (
          e.parent === this &&
            this.getIndex(e) < this.children.length &&
            (this.remove(e), this.add(e)),
          e
        );
      }),
      (t.Group.prototype.sendToBack = function (e) {
        return (
          e.parent === this &&
            this.getIndex(e) > 0 &&
            (this.remove(e), this.addAt(e, 0)),
          e
        );
      }),
      (t.Group.prototype.moveUp = function (e) {
        if (e.parent === this && this.getIndex(e) < this.children.length - 1) {
          var t = this.getIndex(e),
            n = this.getAt(t + 1);
          n && this.swap(t, n);
        }
        return e;
      }),
      (t.Group.prototype.moveDown = function (e) {
        if (e.parent === this && this.getIndex(e) > 0) {
          var t = this.getIndex(e),
            n = this.getAt(t - 1);
          n && this.swap(t, n);
        }
        return e;
      }),
      (t.Group.prototype.xy = function (e, t, n) {
        return 0 > e || e > this.children.length
          ? -1
          : ((this.getChildAt(e).x = t), void (this.getChildAt(e).y = n));
      }),
      (t.Group.prototype.reverse = function () {
        this.children.reverse(), this.updateZ();
      }),
      (t.Group.prototype.getIndex = function (e) {
        return this.children.indexOf(e);
      }),
      (t.Group.prototype.replace = function (e, n) {
        var r = this.getIndex(e);
        if (-1 !== r) {
          void 0 !== n.parent &&
            (n.events.onRemovedFromGroup.dispatch(n, this),
            n.parent.removeChild(n),
            n.parent instanceof t.Group && n.parent.updateZ());
          var i = e;
          return this.remove(i), this.addAt(n, r), i;
        }
      }),
      (t.Group.prototype.setProperty = function (e, t, n, r) {
        r = r || 0;
        var i = t.length;
        1 == i
          ? 0 === r
            ? (e[t[0]] = n)
            : 1 == r
            ? (e[t[0]] += n)
            : 2 == r
            ? (e[t[0]] -= n)
            : 3 == r
            ? (e[t[0]] *= n)
            : 4 == r && (e[t[0]] /= n)
          : 2 == i
          ? 0 === r
            ? (e[t[0]][t[1]] = n)
            : 1 == r
            ? (e[t[0]][t[1]] += n)
            : 2 == r
            ? (e[t[0]][t[1]] -= n)
            : 3 == r
            ? (e[t[0]][t[1]] *= n)
            : 4 == r && (e[t[0]][t[1]] /= n)
          : 3 == i
          ? 0 === r
            ? (e[t[0]][t[1]][t[2]] = n)
            : 1 == r
            ? (e[t[0]][t[1]][t[2]] += n)
            : 2 == r
            ? (e[t[0]][t[1]][t[2]] -= n)
            : 3 == r
            ? (e[t[0]][t[1]][t[2]] *= n)
            : 4 == r && (e[t[0]][t[1]][t[2]] /= n)
          : 4 == i &&
            (0 === r
              ? (e[t[0]][t[1]][t[2]][t[3]] = n)
              : 1 == r
              ? (e[t[0]][t[1]][t[2]][t[3]] += n)
              : 2 == r
              ? (e[t[0]][t[1]][t[2]][t[3]] -= n)
              : 3 == r
              ? (e[t[0]][t[1]][t[2]][t[3]] *= n)
              : 4 == r && (e[t[0]][t[1]][t[2]][t[3]] /= n));
      }),
      (t.Group.prototype.set = function (e, t, n, r, i, s) {
        (t = t.split(".")),
          "undefined" == typeof r && (r = !1),
          "undefined" == typeof i && (i = !1),
          (r === !1 || (r && e.alive)) &&
            (i === !1 || (i && e.visible)) &&
            this.setProperty(e, t, n, s);
      }),
      (t.Group.prototype.setAll = function (e, t, n, r, i) {
        (e = e.split(".")),
          "undefined" == typeof n && (n = !1),
          "undefined" == typeof r && (r = !1),
          (i = i || 0);
        for (var s = 0, o = this.children.length; o > s; s++)
          (!n || (n && this.children[s].alive)) &&
            (!r || (r && this.children[s].visible)) &&
            this.setProperty(this.children[s], e, t, i);
      }),
      (t.Group.prototype.setAllChildren = function (e, n, r, i, s) {
        "undefined" == typeof r && (r = !1),
          "undefined" == typeof i && (i = !1),
          (s = s || 0);
        for (var o = 0, u = this.children.length; u > o; o++)
          (!r || (r && this.children[o].alive)) &&
            (!i || (i && this.children[o].visible)) &&
            (this.children[o] instanceof t.Group
              ? this.children[o].setAllChildren(e, n, r, i, s)
              : this.setProperty(this.children[o], e.split("."), n, s));
      }),
      (t.Group.prototype.addAll = function (e, t, n, r) {
        this.setAll(e, t, n, r, 1);
      }),
      (t.Group.prototype.subAll = function (e, t, n, r) {
        this.setAll(e, t, n, r, 2);
      }),
      (t.Group.prototype.multiplyAll = function (e, t, n, r) {
        this.setAll(e, t, n, r, 3);
      }),
      (t.Group.prototype.divideAll = function (e, t, n, r) {
        this.setAll(e, t, n, r, 4);
      }),
      (t.Group.prototype.callAllExists = function (e, t) {
        for (
          var n = Array.prototype.splice.call(arguments, 2),
            r = 0,
            i = this.children.length;
          i > r;
          r++
        )
          this.children[r].exists === t &&
            this.children[r][e] &&
            this.children[r][e].apply(this.children[r], n);
      }),
      (t.Group.prototype.callbackFromArray = function (e, t, n) {
        if (1 == n) {
          if (e[t[0]]) return e[t[0]];
        } else if (2 == n) {
          if (e[t[0]][t[1]]) return e[t[0]][t[1]];
        } else if (3 == n) {
          if (e[t[0]][t[1]][t[2]]) return e[t[0]][t[1]][t[2]];
        } else if (4 == n) {
          if (e[t[0]][t[1]][t[2]][t[3]]) return e[t[0]][t[1]][t[2]][t[3]];
        } else if (e[t]) return e[t];
        return !1;
      }),
      (t.Group.prototype.callAll = function (e, t) {
        if ("undefined" != typeof e) {
          e = e.split(".");
          var n = e.length;
          if ("undefined" == typeof t || null === t || "" === t) t = null;
          else if ("string" == typeof t) {
            t = t.split(".");
            var r = t.length;
          }
          for (
            var i = Array.prototype.splice.call(arguments, 2),
              s = null,
              o = null,
              u = 0,
              a = this.children.length;
            a > u;
            u++
          )
            (s = this.callbackFromArray(this.children[u], e, n)),
              t && s
                ? ((o = this.callbackFromArray(this.children[u], t, r)),
                  s && s.apply(o, i))
                : s && s.apply(this.children[u], i);
        }
      }),
      (t.Group.prototype.preUpdate = function () {
        if (!this.exists || !this.parent.exists)
          return (this.renderOrderID = -1), !1;
        for (var e = this.children.length; e--; ) this.children[e].preUpdate();
        return !0;
      }),
      (t.Group.prototype.update = function () {
        for (var e = this.children.length; e--; ) this.children[e].update();
      }),
      (t.Group.prototype.postUpdate = function () {
        1 === this._cache[7] &&
          ((this.x = this.game.camera.view.x + this.cameraOffset.x),
          (this.y = this.game.camera.view.y + this.cameraOffset.y));
        for (var e = this.children.length; e--; ) this.children[e].postUpdate();
      }),
      (t.Group.prototype.forEach = function (e, t, n) {
        "undefined" == typeof n && (n = !1);
        var r = Array.prototype.splice.call(arguments, 3);
        r.unshift(null);
        for (var i = 0, s = this.children.length; s > i; i++)
          (!n || (n && this.children[i].exists)) &&
            ((r[0] = this.children[i]), e.apply(t, r));
      }),
      (t.Group.prototype.forEachExists = function (e, n) {
        var r = Array.prototype.splice.call(arguments, 2);
        r.unshift(null),
          this.iterate("exists", !0, t.Group.RETURN_TOTAL, e, n, r);
      }),
      (t.Group.prototype.forEachAlive = function (e, n) {
        var r = Array.prototype.splice.call(arguments, 2);
        r.unshift(null),
          this.iterate("alive", !0, t.Group.RETURN_TOTAL, e, n, r);
      }),
      (t.Group.prototype.forEachDead = function (e, n) {
        var r = Array.prototype.splice.call(arguments, 2);
        r.unshift(null),
          this.iterate("alive", !1, t.Group.RETURN_TOTAL, e, n, r);
      }),
      (t.Group.prototype.sort = function (e, n) {
        this.children.length < 2 ||
          ("undefined" == typeof e && (e = "z"),
          "undefined" == typeof n && (n = t.Group.SORT_ASCENDING),
          (this._sortProperty = e),
          this.children.sort(
            n === t.Group.SORT_ASCENDING
              ? this.ascendingSortHandler.bind(this)
              : this.descendingSortHandler.bind(this)
          ),
          this.updateZ());
      }),
      (t.Group.prototype.ascendingSortHandler = function (e, t) {
        return e[this._sortProperty] < t[this._sortProperty]
          ? -1
          : e[this._sortProperty] > t[this._sortProperty]
          ? 1
          : e.z < t.z
          ? -1
          : 1;
      }),
      (t.Group.prototype.descendingSortHandler = function (e, t) {
        return e[this._sortProperty] < t[this._sortProperty]
          ? 1
          : e[this._sortProperty] > t[this._sortProperty]
          ? -1
          : 0;
      }),
      (t.Group.prototype.iterate = function (e, n, r, i, s, o) {
        if (r === t.Group.RETURN_TOTAL && 0 === this.children.length) return 0;
        "undefined" == typeof i && (i = !1);
        for (var u = 0, a = 0, f = this.children.length; f > a; a++)
          if (
            this.children[a][e] === n &&
            (u++,
            i && ((o[0] = this.children[a]), i.apply(s, o)),
            r === t.Group.RETURN_CHILD)
          )
            return this.children[a];
        return r === t.Group.RETURN_TOTAL
          ? u
          : r === t.Group.RETURN_CHILD
          ? null
          : void 0;
      }),
      (t.Group.prototype.getFirstExists = function (e) {
        return (
          "boolean" != typeof e && (e = !0),
          this.iterate("exists", e, t.Group.RETURN_CHILD)
        );
      }),
      (t.Group.prototype.getFirstAlive = function () {
        return this.iterate("alive", !0, t.Group.RETURN_CHILD);
      }),
      (t.Group.prototype.getFirstDead = function () {
        return this.iterate("alive", !1, t.Group.RETURN_CHILD);
      }),
      (t.Group.prototype.getTop = function () {
        return this.children.length > 0
          ? this.children[this.children.length - 1]
          : void 0;
      }),
      (t.Group.prototype.getBottom = function () {
        return this.children.length > 0 ? this.children[0] : void 0;
      }),
      (t.Group.prototype.countLiving = function () {
        return this.iterate("alive", !0, t.Group.RETURN_TOTAL);
      }),
      (t.Group.prototype.countDead = function () {
        return this.iterate("alive", !1, t.Group.RETURN_TOTAL);
      }),
      (t.Group.prototype.getRandom = function (e, t) {
        return 0 === this.children.length
          ? null
          : ((e = e || 0),
            (t = t || this.children.length),
            this.game.math.getRandom(this.children, e, t));
      }),
      (t.Group.prototype.remove = function (e) {
        return 0 !== this.children.length
          ? (e.events && e.events.onRemovedFromGroup.dispatch(e, this),
            this.removeChild(e),
            this.updateZ(),
            this.cursor === e && this.next(),
            !0)
          : void 0;
      }),
      (t.Group.prototype.removeAll = function () {
        if (0 !== this.children.length) {
          do
            this.children[0].events &&
              this.children[0].events.onRemovedFromGroup.dispatch(
                this.children[0],
                this
              ),
              this.removeChild(this.children[0]);
          while (this.children.length > 0);
          this.cursor = null;
        }
      }),
      (t.Group.prototype.removeBetween = function (e, t) {
        if (0 !== this.children.length) {
          if (e > t || 0 > e || t > this.children.length) return !1;
          for (var n = e; t > n; n++)
            this.children[n].events &&
              this.children[n].events.onRemovedFromGroup.dispatch(
                this.children[n],
                this
              ),
              this.removeChild(this.children[n]),
              this.cursor === this.children[n] && (this.cursor = null);
          this.updateZ();
        }
      }),
      (t.Group.prototype.destroy = function (e, t) {
        if (null !== this.game) {
          if (
            ("undefined" == typeof e && (e = !0),
            "undefined" == typeof t && (t = !1),
            e)
          ) {
            if (this.children.length > 0)
              do this.children[0].parent && this.children[0].destroy(e);
              while (this.children.length > 0);
          } else this.removeAll();
          (this.cursor = null),
            t ||
              (this.parent.removeChild(this),
              (this.game = null),
              (this.exists = !1));
        }
      }),
      Object.defineProperty(t.Group.prototype, "total", {
        get: function () {
          return this.iterate("exists", !0, t.Group.RETURN_TOTAL);
        },
      }),
      Object.defineProperty(t.Group.prototype, "length", {
        get: function () {
          return this.children.length;
        },
      }),
      Object.defineProperty(t.Group.prototype, "angle", {
        get: function () {
          return t.Math.radToDeg(this.rotation);
        },
        set: function (e) {
          this.rotation = t.Math.degToRad(e);
        },
      }),
      Object.defineProperty(t.Group.prototype, "fixedToCamera", {
        get: function () {
          return !!this._cache[7];
        },
        set: function (e) {
          e
            ? ((this._cache[7] = 1), this.cameraOffset.set(this.x, this.y))
            : (this._cache[7] = 0);
        },
      }),
      (t.World = function (e) {
        t.Group.call(this, e, null, "__world", !1),
          (this.bounds = new t.Rectangle(0, 0, e.width, e.height)),
          (this.camera = null);
      }),
      (t.World.prototype = Object.create(t.Group.prototype)),
      (t.World.prototype.constructor = t.World),
      (t.World.prototype.boot = function () {
        (this.camera = new t.Camera(
          this.game,
          0,
          0,
          0,
          this.game.width,
          this.game.height
        )),
          (this.camera.displayObject = this),
          (this.camera.scale = this.scale),
          (this.game.camera = this.camera),
          this.game.stage.addChild(this);
      }),
      (t.World.prototype.setBounds = function (e, t, n, r) {
        n < this.game.width && (n = this.game.width),
          r < this.game.height && (r = this.game.height),
          this.bounds.setTo(e, t, n, r),
          this.camera.bounds && this.camera.bounds.setTo(e, t, n, r),
          this.game.physics.setBoundsToWorld();
      }),
      (t.World.prototype.shutdown = function () {
        this.destroy(!0, !0);
      }),
      Object.defineProperty(t.World.prototype, "width", {
        get: function () {
          return this.bounds.width;
        },
        set: function (e) {
          this.bounds.width = e;
        },
      }),
      Object.defineProperty(t.World.prototype, "height", {
        get: function () {
          return this.bounds.height;
        },
        set: function (e) {
          this.bounds.height = e;
        },
      }),
      Object.defineProperty(t.World.prototype, "centerX", {
        get: function () {
          return this.bounds.halfWidth;
        },
      }),
      Object.defineProperty(t.World.prototype, "centerY", {
        get: function () {
          return this.bounds.halfHeight;
        },
      }),
      Object.defineProperty(t.World.prototype, "randomX", {
        get: function () {
          return this.bounds.x < 0
            ? this.game.rnd.integerInRange(
                this.bounds.x,
                this.bounds.width - Math.abs(this.bounds.x)
              )
            : this.game.rnd.integerInRange(this.bounds.x, this.bounds.width);
        },
      }),
      Object.defineProperty(t.World.prototype, "randomY", {
        get: function () {
          return this.bounds.y < 0
            ? this.game.rnd.integerInRange(
                this.bounds.y,
                this.bounds.height - Math.abs(this.bounds.y)
              )
            : this.game.rnd.integerInRange(this.bounds.y, this.bounds.height);
        },
      }),
      (t.ScaleManager = function (e, n, r) {
        (this.game = e),
          (this.width = n),
          (this.height = r),
          (this.minWidth = null),
          (this.maxWidth = null),
          (this.minHeight = null),
          (this.maxHeight = null),
          (this.forceLandscape = !1),
          (this.forcePortrait = !1),
          (this.incorrectOrientation = !1),
          (this.pageAlignHorizontally = !1),
          (this.pageAlignVertically = !1),
          (this.maxIterations = 5),
          (this.orientationSprite = null),
          (this.enterLandscape = new t.Signal()),
          (this.enterPortrait = new t.Signal()),
          (this.enterIncorrectOrientation = new t.Signal()),
          (this.leaveIncorrectOrientation = new t.Signal()),
          (this.hasResized = new t.Signal()),
          (this.fullScreenTarget = this.game.canvas),
          (this.enterFullScreen = new t.Signal()),
          (this.leaveFullScreen = new t.Signal()),
          (this.orientation = 0),
          window.orientation
            ? (this.orientation = window.orientation)
            : window.outerWidth > window.outerHeight && (this.orientation = 90),
          (this.scaleFactor = new t.Point(1, 1)),
          (this.scaleFactorInversed = new t.Point(1, 1)),
          (this.margin = new t.Point(0, 0)),
          (this.aspectRatio = 0),
          (this.sourceAspectRatio = n / r),
          (this.event = null),
          (this.scaleMode = t.ScaleManager.NO_SCALE),
          (this.fullScreenScaleMode = t.ScaleManager.NO_SCALE),
          (this._startHeight = 0),
          (this._width = 0),
          (this._height = 0);
        var i = this;
        window.addEventListener(
          "orientationchange",
          function (e) {
            return i.checkOrientation(e);
          },
          !1
        ),
          window.addEventListener(
            "resize",
            function (e) {
              return i.checkResize(e);
            },
            !1
          ),
          document.addEventListener(
            "webkitfullscreenchange",
            function (e) {
              return i.fullScreenChange(e);
            },
            !1
          ),
          document.addEventListener(
            "mozfullscreenchange",
            function (e) {
              return i.fullScreenChange(e);
            },
            !1
          ),
          document.addEventListener(
            "fullscreenchange",
            function (e) {
              return i.fullScreenChange(e);
            },
            !1
          );
      }),
      (t.ScaleManager.EXACT_FIT = 0),
      (t.ScaleManager.NO_SCALE = 1),
      (t.ScaleManager.SHOW_ALL = 2),
      (t.ScaleManager.prototype = {
        startFullScreen: function (e) {
          !this.isFullScreen &&
            this.game.device.fullscreen &&
            ("undefined" != typeof e &&
              this.game.renderType === t.CANVAS &&
              (this.game.stage.smoothed = e),
            (this._width = this.width),
            (this._height = this.height),
            this.game.device.fullscreenKeyboard
              ? this.fullScreenTarget[this.game.device.requestFullscreen](
                  Element.ALLOW_KEYBOARD_INPUT
                )
              : this.fullScreenTarget[this.game.device.requestFullscreen]());
        },
        stopFullScreen: function () {
          this.fullScreenTarget[this.game.device.cancelFullscreen]();
        },
        fullScreenChange: function (e) {
          (this.event = e),
            this.isFullScreen
              ? (this.fullScreenScaleMode === t.ScaleManager.EXACT_FIT
                  ? ((this.fullScreenTarget.style.width = "100%"),
                    (this.fullScreenTarget.style.height = "100%"),
                    (this.width = window.outerWidth),
                    (this.height = window.outerHeight),
                    this.game.input.scale.setTo(
                      this.game.width / this.width,
                      this.game.height / this.height
                    ),
                    (this.aspectRatio = this.width / this.height),
                    (this.scaleFactor.x = this.game.width / this.width),
                    (this.scaleFactor.y = this.game.height / this.height),
                    this.checkResize())
                  : this.fullScreenScaleMode === t.ScaleManager.SHOW_ALL &&
                    (this.setShowAll(), this.refresh()),
                this.enterFullScreen.dispatch(this.width, this.height))
              : ((this.fullScreenTarget.style.width = this.game.width + "px"),
                (this.fullScreenTarget.style.height = this.game.height + "px"),
                (this.width = this._width),
                (this.height = this._height),
                this.game.input.scale.setTo(
                  this.game.width / this.width,
                  this.game.height / this.height
                ),
                (this.aspectRatio = this.width / this.height),
                (this.scaleFactor.x = this.game.width / this.width),
                (this.scaleFactor.y = this.game.height / this.height),
                this.leaveFullScreen.dispatch(this.width, this.height));
        },
        forceOrientation: function (e, n, r) {
          "undefined" == typeof n && (n = !1),
            (this.forceLandscape = e),
            (this.forcePortrait = n),
            "undefined" != typeof r &&
              ((null == r || this.game.cache.checkImageKey(r) === !1) &&
                (r = "__default"),
              (this.orientationSprite = new t.Image(
                this.game,
                this.game.width / 2,
                this.game.height / 2,
                PIXI.TextureCache[r]
              )),
              this.orientationSprite.anchor.set(0.5),
              this.checkOrientationState(),
              this.incorrectOrientation
                ? ((this.orientationSprite.visible = !0),
                  (this.game.world.visible = !1))
                : ((this.orientationSprite.visible = !1),
                  (this.game.world.visible = !0)),
              this.game.stage.addChild(this.orientationSprite));
        },
        checkOrientationState: function () {
          this.incorrectOrientation
            ? ((this.forceLandscape &&
                window.innerWidth > window.innerHeight) ||
                (this.forcePortrait &&
                  window.innerHeight > window.innerWidth)) &&
              ((this.incorrectOrientation = !1),
              this.leaveIncorrectOrientation.dispatch(),
              this.orientationSprite &&
                ((this.orientationSprite.visible = !1),
                (this.game.world.visible = !0)),
              this.scaleMode !== t.ScaleManager.NO_SCALE && this.refresh())
            : ((this.forceLandscape &&
                window.innerWidth < window.innerHeight) ||
                (this.forcePortrait &&
                  window.innerHeight < window.innerWidth)) &&
              ((this.incorrectOrientation = !0),
              this.enterIncorrectOrientation.dispatch(),
              this.orientationSprite &&
                this.orientationSprite.visible === !1 &&
                ((this.orientationSprite.visible = !0),
                (this.game.world.visible = !1)),
              this.scaleMode !== t.ScaleManager.NO_SCALE && this.refresh());
        },
        checkOrientation: function (e) {
          (this.event = e),
            (this.orientation = window.orientation),
            this.isLandscape
              ? this.enterLandscape.dispatch(this.orientation, !0, !1)
              : this.enterPortrait.dispatch(this.orientation, !1, !0),
            this.scaleMode !== t.ScaleManager.NO_SCALE && this.refresh();
        },
        checkResize: function (e) {
          (this.event = e),
            (this.orientation =
              window.outerWidth > window.outerHeight ? 90 : 0),
            this.isLandscape
              ? this.enterLandscape.dispatch(this.orientation, !0, !1)
              : this.enterPortrait.dispatch(this.orientation, !1, !0),
            this.scaleMode !== t.ScaleManager.NO_SCALE && this.refresh(),
            this.checkOrientationState();
        },
        refresh: function () {
          if (
            (this.game.device.iPad === !1 &&
              this.game.device.webApp === !1 &&
              this.game.device.desktop === !1 &&
              (this.game.device.android && this.game.device.chrome === !1
                ? window.scrollTo(0, 1)
                : window.scrollTo(0, 0)),
            null == this._check && this.maxIterations > 0)
          ) {
            this._iterations = this.maxIterations;
            var e = this;
            (this._check = window.setInterval(function () {
              return e.setScreenSize();
            }, 10)),
              this.setScreenSize();
          }
        },
        setScreenSize: function (e) {
          "undefined" == typeof e && (e = !1),
            this.game.device.iPad === !1 &&
              this.game.device.webApp === !1 &&
              this.game.device.desktop === !1 &&
              (this.game.device.android && this.game.device.chrome === !1
                ? window.scrollTo(0, 1)
                : window.scrollTo(0, 0)),
            this._iterations--,
            (e ||
              window.innerHeight > this._startHeight ||
              this._iterations < 0) &&
              ((document.documentElement.style.minHeight =
                window.innerHeight + "px"),
              this.incorrectOrientation === !0
                ? this.setMaximum()
                : this.isFullScreen
                ? this.fullScreenScaleMode == t.ScaleManager.EXACT_FIT
                  ? this.setExactFit()
                  : this.fullScreenScaleMode == t.ScaleManager.SHOW_ALL &&
                    this.setShowAll()
                : this.scaleMode == t.ScaleManager.EXACT_FIT
                ? this.setExactFit()
                : this.scaleMode == t.ScaleManager.SHOW_ALL &&
                  this.setShowAll(),
              this.setSize(),
              clearInterval(this._check),
              (this._check = null));
        },
        setSize: function () {
          this.incorrectOrientation === !1 &&
            (this.maxWidth &&
              this.width > this.maxWidth &&
              (this.width = this.maxWidth),
            this.maxHeight &&
              this.height > this.maxHeight &&
              (this.height = this.maxHeight),
            this.minWidth &&
              this.width < this.minWidth &&
              (this.width = this.minWidth),
            this.minHeight &&
              this.height < this.minHeight &&
              (this.height = this.minHeight)),
            (this.game.canvas.style.width = this.width + "px"),
            (this.game.canvas.style.height = this.height + "px"),
            this.game.input.scale.setTo(
              this.game.width / this.width,
              this.game.height / this.height
            ),
            this.pageAlignHorizontally &&
              (this.width < window.innerWidth &&
              this.incorrectOrientation === !1
                ? ((this.margin.x = Math.round(
                    (window.innerWidth - this.width) / 2
                  )),
                  (this.game.canvas.style.marginLeft = this.margin.x + "px"))
                : ((this.margin.x = 0),
                  (this.game.canvas.style.marginLeft = "0px"))),
            this.pageAlignVertically &&
              (this.height < window.innerHeight &&
              this.incorrectOrientation === !1
                ? ((this.margin.y = Math.round(
                    (window.innerHeight - this.height) / 2
                  )),
                  (this.game.canvas.style.marginTop = this.margin.y + "px"))
                : ((this.margin.y = 0),
                  (this.game.canvas.style.marginTop = "0px"))),
            t.Canvas.getOffset(this.game.canvas, this.game.stage.offset),
            (this.aspectRatio = this.width / this.height),
            (this.scaleFactor.x = this.game.width / this.width),
            (this.scaleFactor.y = this.game.height / this.height),
            (this.scaleFactorInversed.x = this.width / this.game.width),
            (this.scaleFactorInversed.y = this.height / this.game.height),
            this.hasResized.dispatch(this.width, this.height),
            this.checkOrientationState();
        },
        setMaximum: function () {
          (this.width = window.innerWidth), (this.height = window.innerHeight);
        },
        setShowAll: function () {
          var e = Math.min(
            window.innerHeight / this.game.height,
            window.innerWidth / this.game.width
          );
          (this.width = Math.round(this.game.width * e)),
            (this.height = Math.round(this.game.height * e));
        },
        setExactFit: function () {
          var e = window.innerWidth,
            t = window.innerHeight;
          (this.width = this.maxWidth && e > this.maxWidth ? this.maxWidth : e),
            (this.height =
              this.maxHeight && t > this.maxHeight ? this.maxHeight : t);
        },
      }),
      (t.ScaleManager.prototype.constructor = t.ScaleManager),
      Object.defineProperty(t.ScaleManager.prototype, "isFullScreen", {
        get: function () {
          return (
            document.fullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement
          );
        },
      }),
      Object.defineProperty(t.ScaleManager.prototype, "isPortrait", {
        get: function () {
          return 0 === this.orientation || 180 == this.orientation;
        },
      }),
      Object.defineProperty(t.ScaleManager.prototype, "isLandscape", {
        get: function () {
          return 90 === this.orientation || -90 === this.orientation;
        },
      }),
      (t.Game = function (e, n, r, i, s, o, u, a) {
        (this.id = t.GAMES.push(this) - 1),
          (this.config = null),
          (this.physicsConfig = a),
          (this.parent = ""),
          (this.width = 800),
          (this.height = 600),
          (this.transparent = !1),
          (this.antialias = !0),
          (this.renderer = t.AUTO),
          (this.renderType = t.AUTO),
          (this.state = null),
          (this.isBooted = !1),
          (this.isRunning = !1),
          (this.raf = null),
          (this.add = null),
          (this.make = null),
          (this.cache = null),
          (this.input = null),
          (this.load = null),
          (this.math = null),
          (this.net = null),
          (this.scale = null),
          (this.sound = null),
          (this.stage = null),
          (this.time = null),
          (this.tweens = null),
          (this.world = null),
          (this.physics = null),
          (this.rnd = null),
          (this.device = null),
          (this.camera = null),
          (this.canvas = null),
          (this.context = null),
          (this.debug = null),
          (this.particles = null),
          (this.stepping = !1),
          (this.pendingStep = !1),
          (this.stepCount = 0),
          (this.onPause = null),
          (this.onResume = null),
          (this.onBlur = null),
          (this.onFocus = null),
          (this._paused = !1),
          (this._codePaused = !1),
          1 === arguments.length && "object" == typeof arguments[0]
            ? this.parseConfig(arguments[0])
            : ("undefined" != typeof e && (this.width = e),
              "undefined" != typeof n && (this.height = n),
              "undefined" != typeof r &&
                ((this.renderer = r), (this.renderType = r)),
              "undefined" != typeof i && (this.parent = i),
              "undefined" != typeof o && (this.transparent = o),
              "undefined" != typeof u && (this.antialias = u),
              (this.rnd = new t.RandomDataGenerator([
                (Date.now() * Math.random()).toString(),
              ])),
              (this.state = new t.StateManager(this, s)));
        var f = this;
        return (
          (this._onBoot = function () {
            return f.boot();
          }),
          "complete" === document.readyState ||
          "interactive" === document.readyState
            ? window.setTimeout(this._onBoot, 0)
            : (document.addEventListener("DOMContentLoaded", this._onBoot, !1),
              window.addEventListener("load", this._onBoot, !1)),
          this
        );
      }),
      (t.Game.prototype = {
        parseConfig: function (e) {
          (this.config = e),
            e.width && (this.width = t.Utils.parseDimension(e.width, 0)),
            e.height && (this.height = t.Utils.parseDimension(e.height, 1)),
            e.renderer &&
              ((this.renderer = e.renderer), (this.renderType = e.renderer)),
            e.parent && (this.parent = e.parent),
            e.transparent && (this.transparent = e.transparent),
            e.antialias && (this.antialias = e.antialias),
            e.physicsConfig && (this.physicsConfig = e.physicsConfig);
          var n = [(Date.now() * Math.random()).toString()];
          e.seed && (n = e.seed), (this.rnd = new t.RandomDataGenerator(n));
          var r = null;
          e.state && (r = e.state), (this.state = new t.StateManager(this, r));
        },
        boot: function () {
          this.isBooted ||
            (document.body
              ? (document.removeEventListener("DOMContentLoaded", this._onBoot),
                window.removeEventListener("load", this._onBoot),
                (this.onPause = new t.Signal()),
                (this.onResume = new t.Signal()),
                (this.onBlur = new t.Signal()),
                (this.onFocus = new t.Signal()),
                (this.isBooted = !0),
                (this.device = new t.Device(this)),
                (this.math = t.Math),
                (this.stage = new t.Stage(this, this.width, this.height)),
                (this.scale = new t.ScaleManager(
                  this,
                  this.width,
                  this.height
                )),
                this.setUpRenderer(),
                this.device.checkFullScreenSupport(),
                (this.world = new t.World(this)),
                (this.add = new t.GameObjectFactory(this)),
                (this.make = new t.GameObjectCreator(this)),
                (this.cache = new t.Cache(this)),
                (this.load = new t.Loader(this)),
                (this.time = new t.Time(this)),
                (this.tweens = new t.TweenManager(this)),
                (this.input = new t.Input(this)),
                (this.sound = new t.SoundManager(this)),
                (this.physics = new t.Physics(this, this.physicsConfig)),
                (this.particles = new t.Particles(this)),
                (this.plugins = new t.PluginManager(this, this)),
                (this.net = new t.Net(this)),
                (this.debug = new t.Utils.Debug(this)),
                this.time.boot(),
                this.stage.boot(),
                this.world.boot(),
                this.input.boot(),
                this.sound.boot(),
                this.state.boot(),
                this.debug.boot(),
                this.showDebugHeader(),
                (this.isRunning = !0),
                (this.raf =
                  this.config && this.config.forceSetTimeOut
                    ? new t.RequestAnimationFrame(
                        this,
                        this.config.forceSetTimeOut
                      )
                    : new t.RequestAnimationFrame(this, !1)),
                this.raf.start())
              : window.setTimeout(this._onBoot, 20));
        },
        showDebugHeader: function () {
          var e = t.DEV_VERSION,
            n = "Canvas",
            r = "HTML Audio",
            i = 1;
          if (
            (this.renderType === t.WEBGL
              ? ((n = "WebGL"), i++)
              : this.renderType == t.HEADLESS && (n = "Headless"),
            this.device.webAudio && ((r = "WebAudio"), i++),
            this.device.chrome)
          ) {
            for (
              var s = [
                  "%c %c %c Phaser v" +
                    e +
                    " - " +
                    n +
                    " - " +
                    r +
                    "  %c %c  http://phaser.io  %c %c ♥%c♥%c♥ ",
                  "background: #0cf300",
                  "background: #00bc17",
                  "color: #ffffff; background: #00711f;",
                  "background: #00bc17",
                  "background: #0cf300",
                  "background: #00bc17",
                ],
                o = 0;
              3 > o;
              o++
            )
              s.push(
                i > o
                  ? "color: #ff2424; background: #fff"
                  : "color: #959595; background: #fff"
              );
            console.log.apply(console, s);
          } else
            console.log(
              "Phaser v" +
                e +
                " - Renderer: " +
                n +
                " - Audio: " +
                r +
                " - http://phaser.io"
            );
        },
        setUpRenderer: function () {
          if (
            (this.device.trident && (this.renderType = t.CANVAS),
            this.renderType === t.HEADLESS ||
              this.renderType === t.CANVAS ||
              (this.renderType === t.AUTO && this.device.webGL === !1))
          ) {
            if (!this.device.canvas)
              throw new Error(
                "Phaser.Game - cannot create Canvas or WebGL context, aborting."
              );
            this.renderType === t.AUTO && (this.renderType = t.CANVAS),
              (this.renderer = new PIXI.CanvasRenderer(
                this.width,
                this.height,
                this.canvas,
                this.transparent
              )),
              (this.context = this.renderer.context);
          } else
            (this.renderType = t.WEBGL),
              (this.renderer = new PIXI.WebGLRenderer(
                this.width,
                this.height,
                this.canvas,
                this.transparent,
                this.antialias
              )),
              (this.context = null);
          this.renderType !== t.HEADLESS &&
            ((this.stage.smoothed = this.antialias),
            t.Canvas.addToDOM(this.canvas, this.parent, !0),
            t.Canvas.setTouchAction(this.canvas));
        },
        update: function (e) {
          this.time.update(e),
            this._paused || this.pendingStep
              ? this.debug.preUpdate()
              : (this.stepping && (this.pendingStep = !0),
                this.debug.preUpdate(),
                this.physics.preUpdate(),
                this.state.preUpdate(),
                this.plugins.preUpdate(),
                this.stage.preUpdate(),
                this.stage.update(),
                this.tweens.update(),
                this.sound.update(),
                this.input.update(),
                this.state.update(),
                this.physics.update(),
                this.particles.update(),
                this.plugins.update(),
                this.stage.postUpdate(),
                this.plugins.postUpdate()),
            this.renderType != t.HEADLESS &&
              (this.renderer.render(this.stage),
              this.plugins.render(),
              this.state.render(),
              this.plugins.postRender());
        },
        enableStep: function () {
          (this.stepping = !0), (this.pendingStep = !1), (this.stepCount = 0);
        },
        disableStep: function () {
          (this.stepping = !1), (this.pendingStep = !1);
        },
        step: function () {
          (this.pendingStep = !1), this.stepCount++;
        },
        destroy: function () {
          this.raf.stop(),
            this.input.destroy(),
            this.state.destroy(),
            this.physics.destroy(),
            (this.state = null),
            (this.cache = null),
            (this.input = null),
            (this.load = null),
            (this.sound = null),
            (this.stage = null),
            (this.time = null),
            (this.world = null),
            (this.isBooted = !1);
        },
        gamePaused: function (e) {
          this._paused ||
            ((this._paused = !0),
            this.time.gamePaused(),
            this.sound.setMute(),
            this.onPause.dispatch(e));
        },
        gameResumed: function (e) {
          this._paused &&
            !this._codePaused &&
            ((this._paused = !1),
            this.time.gameResumed(),
            this.input.reset(),
            this.sound.unsetMute(),
            this.onResume.dispatch(e));
        },
        focusLoss: function (e) {
          this.onBlur.dispatch(e), this.gamePaused(e);
        },
        focusGain: function (e) {
          this.onFocus.dispatch(e), this.gameResumed(e);
        },
      }),
      (t.Game.prototype.constructor = t.Game),
      Object.defineProperty(t.Game.prototype, "paused", {
        get: function () {
          return this._paused;
        },
        set: function (e) {
          e === !0
            ? this._paused === !1 &&
              ((this._paused = !0),
              (this._codePaused = !0),
              (this.sound.mute = !0),
              this.time.gamePaused(),
              this.onPause.dispatch(this))
            : this._paused &&
              ((this._paused = !1),
              (this._codePaused = !1),
              this.input.reset(),
              (this.sound.mute = !1),
              this.time.gameResumed(),
              this.onResume.dispatch(this));
        },
      }),
      (t.Input = function (e) {
        (this.game = e),
          (this.hitCanvas = null),
          (this.hitContext = null),
          (this.moveCallback = null),
          (this.moveCallbackContext = this),
          (this.pollRate = 0),
          (this.disabled = !1),
          (this.multiInputOverride = t.Input.MOUSE_TOUCH_COMBINE),
          (this.position = null),
          (this.speed = null),
          (this.circle = null),
          (this.scale = null),
          (this.maxPointers = 10),
          (this.currentPointers = 0),
          (this.tapRate = 200),
          (this.doubleTapRate = 300),
          (this.holdRate = 2e3),
          (this.justPressedRate = 200),
          (this.justReleasedRate = 200),
          (this.recordPointerHistory = !1),
          (this.recordRate = 100),
          (this.recordLimit = 100),
          (this.pointer1 = null),
          (this.pointer2 = null),
          (this.pointer3 = null),
          (this.pointer4 = null),
          (this.pointer5 = null),
          (this.pointer6 = null),
          (this.pointer7 = null),
          (this.pointer8 = null),
          (this.pointer9 = null),
          (this.pointer10 = null),
          (this.activePointer = null),
          (this.mousePointer = null),
          (this.mouse = null),
          (this.keyboard = null),
          (this.touch = null),
          (this.mspointer = null),
          (this.gamepad = null),
          (this.onDown = null),
          (this.onUp = null),
          (this.onTap = null),
          (this.onHold = null),
          (this.interactiveItems = new t.LinkedList()),
          (this._localPoint = new t.Point()),
          (this._pollCounter = 0),
          (this._oldPosition = null),
          (this._x = 0),
          (this._y = 0);
      }),
      (t.Input.MOUSE_OVERRIDES_TOUCH = 0),
      (t.Input.TOUCH_OVERRIDES_MOUSE = 1),
      (t.Input.MOUSE_TOUCH_COMBINE = 2),
      (t.Input.prototype = {
        boot: function () {
          (this.mousePointer = new t.Pointer(this.game, 0)),
            (this.pointer1 = new t.Pointer(this.game, 1)),
            (this.pointer2 = new t.Pointer(this.game, 2)),
            (this.mouse = new t.Mouse(this.game)),
            (this.keyboard = new t.Keyboard(this.game)),
            (this.touch = new t.Touch(this.game)),
            (this.mspointer = new t.MSPointer(this.game)),
            (this.gamepad = new t.Gamepad(this.game)),
            (this.onDown = new t.Signal()),
            (this.onUp = new t.Signal()),
            (this.onTap = new t.Signal()),
            (this.onHold = new t.Signal()),
            (this.scale = new t.Point(1, 1)),
            (this.speed = new t.Point()),
            (this.position = new t.Point()),
            (this._oldPosition = new t.Point()),
            (this.circle = new t.Circle(0, 0, 44)),
            (this.activePointer = this.mousePointer),
            (this.currentPointers = 0),
            (this.hitCanvas = document.createElement("canvas")),
            (this.hitCanvas.width = 1),
            (this.hitCanvas.height = 1),
            (this.hitContext = this.hitCanvas.getContext("2d")),
            this.mouse.start(),
            this.keyboard.start(),
            this.touch.start(),
            this.mspointer.start(),
            (this.mousePointer.active = !0);
        },
        destroy: function () {
          this.mouse.stop(),
            this.keyboard.stop(),
            this.touch.stop(),
            this.mspointer.stop(),
            this.gamepad.stop(),
            (this.moveCallback = null);
        },
        setMoveCallback: function (e, t) {
          (this.moveCallback = e), (this.moveCallbackContext = t);
        },
        addPointer: function () {
          for (var e = 0, n = 10; n > 0; n--)
            null === this["pointer" + n] && (e = n);
          return 0 === e
            ? (console.warn("You can only have 10 Pointer objects"), null)
            : ((this["pointer" + e] = new t.Pointer(this.game, e)),
              this["pointer" + e]);
        },
        update: function () {
          return (
            this.keyboard.update(),
            this.pollRate > 0 && this._pollCounter < this.pollRate
              ? void this._pollCounter++
              : ((this.speed.x = this.position.x - this._oldPosition.x),
                (this.speed.y = this.position.y - this._oldPosition.y),
                this._oldPosition.copyFrom(this.position),
                this.mousePointer.update(),
                this.gamepad.active && this.gamepad.update(),
                this.pointer1.update(),
                this.pointer2.update(),
                this.pointer3 && this.pointer3.update(),
                this.pointer4 && this.pointer4.update(),
                this.pointer5 && this.pointer5.update(),
                this.pointer6 && this.pointer6.update(),
                this.pointer7 && this.pointer7.update(),
                this.pointer8 && this.pointer8.update(),
                this.pointer9 && this.pointer9.update(),
                this.pointer10 && this.pointer10.update(),
                void (this._pollCounter = 0))
          );
        },
        reset: function (e) {
          if (this.game.isBooted !== !1) {
            "undefined" == typeof e && (e = !1),
              this.keyboard.reset(),
              this.mousePointer.reset(),
              this.gamepad.reset();
            for (var n = 1; 10 >= n; n++)
              this["pointer" + n] && this["pointer" + n].reset();
            (this.currentPointers = 0),
              "none" !== this.game.canvas.style.cursor &&
                (this.game.canvas.style.cursor = "inherit"),
              e === !0 &&
                (this.onDown.dispose(),
                this.onUp.dispose(),
                this.onTap.dispose(),
                this.onHold.dispose(),
                (this.onDown = new t.Signal()),
                (this.onUp = new t.Signal()),
                (this.onTap = new t.Signal()),
                (this.onHold = new t.Signal()),
                this.interactiveItems.callAll("reset")),
              (this._pollCounter = 0);
          }
        },
        resetSpeed: function (e, t) {
          this._oldPosition.setTo(e, t), this.speed.setTo(0, 0);
        },
        startPointer: function (e) {
          if (
            this.maxPointers < 10 &&
            this.totalActivePointers == this.maxPointers
          )
            return null;
          if (this.pointer1.active === !1) return this.pointer1.start(e);
          if (this.pointer2.active === !1) return this.pointer2.start(e);
          for (var t = 3; 10 >= t; t++)
            if (this["pointer" + t] && this["pointer" + t].active === !1)
              return this["pointer" + t].start(e);
          return null;
        },
        updatePointer: function (e) {
          if (this.pointer1.active && this.pointer1.identifier == e.identifier)
            return this.pointer1.move(e);
          if (this.pointer2.active && this.pointer2.identifier == e.identifier)
            return this.pointer2.move(e);
          for (var t = 3; 10 >= t; t++)
            if (
              this["pointer" + t] &&
              this["pointer" + t].active &&
              this["pointer" + t].identifier == e.identifier
            )
              return this["pointer" + t].move(e);
          return null;
        },
        stopPointer: function (e) {
          if (this.pointer1.active && this.pointer1.identifier == e.identifier)
            return this.pointer1.stop(e);
          if (this.pointer2.active && this.pointer2.identifier == e.identifier)
            return this.pointer2.stop(e);
          for (var t = 3; 10 >= t; t++)
            if (
              this["pointer" + t] &&
              this["pointer" + t].active &&
              this["pointer" + t].identifier == e.identifier
            )
              return this["pointer" + t].stop(e);
          return null;
        },
        getPointer: function (e) {
          if (((e = e || !1), this.pointer1.active == e)) return this.pointer1;
          if (this.pointer2.active == e) return this.pointer2;
          for (var t = 3; 10 >= t; t++)
            if (this["pointer" + t] && this["pointer" + t].active == e)
              return this["pointer" + t];
          return null;
        },
        getPointerFromIdentifier: function (e) {
          if (this.pointer1.identifier == e) return this.pointer1;
          if (this.pointer2.identifier == e) return this.pointer2;
          for (var t = 3; 10 >= t; t++)
            if (this["pointer" + t] && this["pointer" + t].identifier == e)
              return this["pointer" + t];
          return null;
        },
        getLocalPosition: function (e, n, r) {
          "undefined" == typeof r && (r = new t.Point());
          var i = e.worldTransform,
            s = 1 / (i.a * i.d + i.b * -i.c);
          return r.setTo(
            i.d * s * n.x + -i.b * s * n.y + (i.ty * i.b - i.tx * i.d) * s,
            i.a * s * n.y + -i.c * s * n.x + (-i.ty * i.a + i.tx * i.c) * s
          );
        },
        hitTest: function (e, n, r) {
          if (!e.worldVisible) return !1;
          if (
            (this.getLocalPosition(e, n, this._localPoint),
            r.copyFrom(this._localPoint),
            e.hitArea && e.hitArea.contains)
          )
            return e.hitArea.contains(this._localPoint.x, this._localPoint.y)
              ? !0
              : !1;
          if (e instanceof t.TileSprite) {
            var i = e.width,
              s = e.height,
              o = -i * e.anchor.x;
            if (this._localPoint.x > o && this._localPoint.x < o + i) {
              var u = -s * e.anchor.y;
              if (this._localPoint.y > u && this._localPoint.y < u + s)
                return !0;
            }
          } else if (e instanceof PIXI.Sprite) {
            var i = e.texture.frame.width,
              s = e.texture.frame.height,
              o = -i * e.anchor.x;
            if (this._localPoint.x > o && this._localPoint.x < o + i) {
              var u = -s * e.anchor.y;
              if (this._localPoint.y > u && this._localPoint.y < u + s)
                return !0;
            }
          }
          for (var a = 0, f = e.children.length; f > a; a++)
            if (this.hitTest(e.children[a], n, r)) return !0;
          return !1;
        },
      }),
      (t.Input.prototype.constructor = t.Input),
      Object.defineProperty(t.Input.prototype, "x", {
        get: function () {
          return this._x;
        },
        set: function (e) {
          this._x = Math.floor(e);
        },
      }),
      Object.defineProperty(t.Input.prototype, "y", {
        get: function () {
          return this._y;
        },
        set: function (e) {
          this._y = Math.floor(e);
        },
      }),
      Object.defineProperty(t.Input.prototype, "pollLocked", {
        get: function () {
          return this.pollRate > 0 && this._pollCounter < this.pollRate;
        },
      }),
      Object.defineProperty(t.Input.prototype, "totalInactivePointers", {
        get: function () {
          return 10 - this.currentPointers;
        },
      }),
      Object.defineProperty(t.Input.prototype, "totalActivePointers", {
        get: function () {
          this.currentPointers = 0;
          for (var e = 1; 10 >= e; e++)
            this["pointer" + e] &&
              this["pointer" + e].active &&
              this.currentPointers++;
          return this.currentPointers;
        },
      }),
      Object.defineProperty(t.Input.prototype, "worldX", {
        get: function () {
          return this.game.camera.view.x + this.x;
        },
      }),
      Object.defineProperty(t.Input.prototype, "worldY", {
        get: function () {
          return this.game.camera.view.y + this.y;
        },
      }),
      (t.Key = function (e, n) {
        (this.game = e),
          (this.event = null),
          (this.isDown = !1),
          (this.isUp = !0),
          (this.altKey = !1),
          (this.ctrlKey = !1),
          (this.shiftKey = !1),
          (this.timeDown = 0),
          (this.duration = 0),
          (this.timeUp = -2500),
          (this.repeats = 0),
          (this.keyCode = n),
          (this.onDown = new t.Signal()),
          (this.onHoldCallback = null),
          (this.onHoldContext = null),
          (this.onUp = new t.Signal());
      }),
      (t.Key.prototype = {
        update: function () {
          this.isDown &&
            ((this.duration = this.game.time.now - this.timeDown),
            this.repeats++,
            this.onHoldCallback &&
              this.onHoldCallback.call(this.onHoldContext, this));
        },
        processKeyDown: function (e) {
          (this.event = e),
            this.isDown ||
              ((this.altKey = e.altKey),
              (this.ctrlKey = e.ctrlKey),
              (this.shiftKey = e.shiftKey),
              (this.isDown = !0),
              (this.isUp = !1),
              (this.timeDown = this.game.time.now),
              (this.duration = 0),
              (this.repeats = 0),
              this.onDown.dispatch(this));
        },
        processKeyUp: function (e) {
          (this.event = e),
            this.isUp ||
              ((this.isDown = !1),
              (this.isUp = !0),
              (this.timeUp = this.game.time.now),
              (this.duration = this.game.time.now - this.timeDown),
              this.onUp.dispatch(this));
        },
        reset: function () {
          (this.isDown = !1),
            (this.isUp = !0),
            (this.timeUp = this.game.time.now),
            (this.duration = this.game.time.now - this.timeDown);
        },
        justPressed: function (e) {
          return (
            "undefined" == typeof e && (e = 2500),
            this.isDown && this.duration < e
          );
        },
        justReleased: function (e) {
          return (
            "undefined" == typeof e && (e = 2500),
            !this.isDown && this.game.time.now - this.timeUp < e
          );
        },
      }),
      (t.Key.prototype.constructor = t.Key),
      (t.Keyboard = function (e) {
        (this.game = e),
          (this.disabled = !1),
          (this.event = null),
          (this.callbackContext = this),
          (this.onDownCallback = null),
          (this.onUpCallback = null),
          (this._keys = []),
          (this._capture = []),
          (this._onKeyDown = null),
          (this._onKeyUp = null),
          (this._i = 0);
      }),
      (t.Keyboard.prototype = {
        addCallbacks: function (e, t, n) {
          (this.callbackContext = e),
            (this.onDownCallback = t),
            "undefined" != typeof n && (this.onUpCallback = n);
        },
        addKey: function (e) {
          return (
            this._keys[e] ||
              ((this._keys[e] = new t.Key(this.game, e)),
              this.addKeyCapture(e)),
            this._keys[e]
          );
        },
        removeKey: function (e) {
          this._keys[e] && ((this._keys[e] = null), this.removeKeyCapture(e));
        },
        createCursorKeys: function () {
          return {
            up: this.addKey(t.Keyboard.UP),
            down: this.addKey(t.Keyboard.DOWN),
            left: this.addKey(t.Keyboard.LEFT),
            right: this.addKey(t.Keyboard.RIGHT),
          };
        },
        start: function () {
          if (null === this._onKeyDown) {
            var e = this;
            (this._onKeyDown = function (t) {
              return e.processKeyDown(t);
            }),
              (this._onKeyUp = function (t) {
                return e.processKeyUp(t);
              }),
              window.addEventListener("keydown", this._onKeyDown, !1),
              window.addEventListener("keyup", this._onKeyUp, !1);
          }
        },
        stop: function () {
          (this._onKeyDown = null),
            (this._onKeyUp = null),
            window.removeEventListener("keydown", this._onKeyDown),
            window.removeEventListener("keyup", this._onKeyUp);
        },
        destroy: function () {
          this.stop(),
            this.clearCaptures(),
            (this._keys.length = 0),
            (this._i = 0);
        },
        addKeyCapture: function (e) {
          if ("object" == typeof e) for (var t in e) this._capture[e[t]] = !0;
          else this._capture[e] = !0;
        },
        removeKeyCapture: function (e) {
          delete this._capture[e];
        },
        clearCaptures: function () {
          this._capture = {};
        },
        update: function () {
          for (this._i = this._keys.length; this._i--; )
            this._keys[this._i] && this._keys[this._i].update();
        },
        processKeyDown: function (e) {
          (this.event = e),
            this.game.input.disabled ||
              this.disabled ||
              (this._capture[e.keyCode] && e.preventDefault(),
              this.onDownCallback &&
                this.onDownCallback.call(this.callbackContext, e),
              this._keys[e.keyCode] ||
                (this._keys[e.keyCode] = new t.Key(this.game, e.keyCode)),
              this._keys[e.keyCode].processKeyDown(e));
        },
        processKeyUp: function (e) {
          (this.event = e),
            this.game.input.disabled ||
              this.disabled ||
              (this._capture[e.keyCode] && e.preventDefault(),
              this.onUpCallback &&
                this.onUpCallback.call(this.callbackContext, e),
              this._keys[e.keyCode] ||
                (this._keys[e.keyCode] = new t.Key(this.game, e.keyCode)),
              this._keys[e.keyCode].processKeyUp(e));
        },
        reset: function () {
          this.event = null;
          for (var e = this._keys.length; e--; )
            this._keys[e] && this._keys[e].reset();
        },
        justPressed: function (e, t) {
          return this._keys[e] ? this._keys[e].justPressed(t) : !1;
        },
        justReleased: function (e, t) {
          return this._keys[e] ? this._keys[e].justReleased(t) : !1;
        },
        isDown: function (e) {
          return this._keys[e] ? this._keys[e].isDown : !1;
        },
      }),
      (t.Keyboard.prototype.constructor = t.Keyboard),
      (t.Keyboard.A = "A".charCodeAt(0)),
      (t.Keyboard.B = "B".charCodeAt(0)),
      (t.Keyboard.C = "C".charCodeAt(0)),
      (t.Keyboard.D = "D".charCodeAt(0)),
      (t.Keyboard.E = "E".charCodeAt(0)),
      (t.Keyboard.F = "F".charCodeAt(0)),
      (t.Keyboard.G = "G".charCodeAt(0)),
      (t.Keyboard.H = "H".charCodeAt(0)),
      (t.Keyboard.I = "I".charCodeAt(0)),
      (t.Keyboard.J = "J".charCodeAt(0)),
      (t.Keyboard.K = "K".charCodeAt(0)),
      (t.Keyboard.L = "L".charCodeAt(0)),
      (t.Keyboard.M = "M".charCodeAt(0)),
      (t.Keyboard.N = "N".charCodeAt(0)),
      (t.Keyboard.O = "O".charCodeAt(0)),
      (t.Keyboard.P = "P".charCodeAt(0)),
      (t.Keyboard.Q = "Q".charCodeAt(0)),
      (t.Keyboard.R = "R".charCodeAt(0)),
      (t.Keyboard.S = "S".charCodeAt(0)),
      (t.Keyboard.T = "T".charCodeAt(0)),
      (t.Keyboard.U = "U".charCodeAt(0)),
      (t.Keyboard.V = "V".charCodeAt(0)),
      (t.Keyboard.W = "W".charCodeAt(0)),
      (t.Keyboard.X = "X".charCodeAt(0)),
      (t.Keyboard.Y = "Y".charCodeAt(0)),
      (t.Keyboard.Z = "Z".charCodeAt(0)),
      (t.Keyboard.ZERO = "0".charCodeAt(0)),
      (t.Keyboard.ONE = "1".charCodeAt(0)),
      (t.Keyboard.TWO = "2".charCodeAt(0)),
      (t.Keyboard.THREE = "3".charCodeAt(0)),
      (t.Keyboard.FOUR = "4".charCodeAt(0)),
      (t.Keyboard.FIVE = "5".charCodeAt(0)),
      (t.Keyboard.SIX = "6".charCodeAt(0)),
      (t.Keyboard.SEVEN = "7".charCodeAt(0)),
      (t.Keyboard.EIGHT = "8".charCodeAt(0)),
      (t.Keyboard.NINE = "9".charCodeAt(0)),
      (t.Keyboard.NUMPAD_0 = 96),
      (t.Keyboard.NUMPAD_1 = 97),
      (t.Keyboard.NUMPAD_2 = 98),
      (t.Keyboard.NUMPAD_3 = 99),
      (t.Keyboard.NUMPAD_4 = 100),
      (t.Keyboard.NUMPAD_5 = 101),
      (t.Keyboard.NUMPAD_6 = 102),
      (t.Keyboard.NUMPAD_7 = 103),
      (t.Keyboard.NUMPAD_8 = 104),
      (t.Keyboard.NUMPAD_9 = 105),
      (t.Keyboard.NUMPAD_MULTIPLY = 106),
      (t.Keyboard.NUMPAD_ADD = 107),
      (t.Keyboard.NUMPAD_ENTER = 108),
      (t.Keyboard.NUMPAD_SUBTRACT = 109),
      (t.Keyboard.NUMPAD_DECIMAL = 110),
      (t.Keyboard.NUMPAD_DIVIDE = 111),
      (t.Keyboard.F1 = 112),
      (t.Keyboard.F2 = 113),
      (t.Keyboard.F3 = 114),
      (t.Keyboard.F4 = 115),
      (t.Keyboard.F5 = 116),
      (t.Keyboard.F6 = 117),
      (t.Keyboard.F7 = 118),
      (t.Keyboard.F8 = 119),
      (t.Keyboard.F9 = 120),
      (t.Keyboard.F10 = 121),
      (t.Keyboard.F11 = 122),
      (t.Keyboard.F12 = 123),
      (t.Keyboard.F13 = 124),
      (t.Keyboard.F14 = 125),
      (t.Keyboard.F15 = 126),
      (t.Keyboard.COLON = 186),
      (t.Keyboard.EQUALS = 187),
      (t.Keyboard.UNDERSCORE = 189),
      (t.Keyboard.QUESTION_MARK = 191),
      (t.Keyboard.TILDE = 192),
      (t.Keyboard.OPEN_BRACKET = 219),
      (t.Keyboard.BACKWARD_SLASH = 220),
      (t.Keyboard.CLOSED_BRACKET = 221),
      (t.Keyboard.QUOTES = 222),
      (t.Keyboard.BACKSPACE = 8),
      (t.Keyboard.TAB = 9),
      (t.Keyboard.CLEAR = 12),
      (t.Keyboard.ENTER = 13),
      (t.Keyboard.SHIFT = 16),
      (t.Keyboard.CONTROL = 17),
      (t.Keyboard.ALT = 18),
      (t.Keyboard.CAPS_LOCK = 20),
      (t.Keyboard.ESC = 27),
      (t.Keyboard.SPACEBAR = 32),
      (t.Keyboard.PAGE_UP = 33),
      (t.Keyboard.PAGE_DOWN = 34),
      (t.Keyboard.END = 35),
      (t.Keyboard.HOME = 36),
      (t.Keyboard.LEFT = 37),
      (t.Keyboard.UP = 38),
      (t.Keyboard.RIGHT = 39),
      (t.Keyboard.DOWN = 40),
      (t.Keyboard.INSERT = 45),
      (t.Keyboard.DELETE = 46),
      (t.Keyboard.HELP = 47),
      (t.Keyboard.NUM_LOCK = 144),
      (t.Mouse = function (e) {
        (this.game = e),
          (this.callbackContext = this.game),
          (this.mouseDownCallback = null),
          (this.mouseMoveCallback = null),
          (this.mouseUpCallback = null),
          (this.capture = !1),
          (this.button = -1),
          (this.disabled = !1),
          (this.locked = !1),
          (this.pointerLock = new t.Signal()),
          (this.event = null),
          (this._onMouseDown = null),
          (this._onMouseMove = null),
          (this._onMouseUp = null);
      }),
      (t.Mouse.NO_BUTTON = -1),
      (t.Mouse.LEFT_BUTTON = 0),
      (t.Mouse.MIDDLE_BUTTON = 1),
      (t.Mouse.RIGHT_BUTTON = 2),
      (t.Mouse.prototype = {
        start: function () {
          if (
            (!this.game.device.android || this.game.device.chrome !== !1) &&
            null === this._onMouseDown
          ) {
            var e = this;
            (this._onMouseDown = function (t) {
              return e.onMouseDown(t);
            }),
              (this._onMouseMove = function (t) {
                return e.onMouseMove(t);
              }),
              (this._onMouseUp = function (t) {
                return e.onMouseUp(t);
              }),
              this.game.canvas.addEventListener(
                "mousedown",
                this._onMouseDown,
                !0
              ),
              this.game.canvas.addEventListener(
                "mousemove",
                this._onMouseMove,
                !0
              ),
              this.game.canvas.addEventListener("mouseup", this._onMouseUp, !0);
          }
        },
        onMouseDown: function (e) {
          (this.event = e),
            this.capture && e.preventDefault(),
            (this.button = e.button),
            this.mouseDownCallback &&
              this.mouseDownCallback.call(this.callbackContext, e),
            this.game.input.disabled ||
              this.disabled ||
              ((e.identifier = 0), this.game.input.mousePointer.start(e));
        },
        onMouseMove: function (e) {
          (this.event = e),
            this.capture && e.preventDefault(),
            this.mouseMoveCallback &&
              this.mouseMoveCallback.call(this.callbackContext, e),
            this.game.input.disabled ||
              this.disabled ||
              ((e.identifier = 0), this.game.input.mousePointer.move(e));
        },
        onMouseUp: function (e) {
          (this.event = e),
            this.capture && e.preventDefault(),
            (this.button = t.Mouse.NO_BUTTON),
            this.mouseUpCallback &&
              this.mouseUpCallback.call(this.callbackContext, e),
            this.game.input.disabled ||
              this.disabled ||
              ((e.identifier = 0), this.game.input.mousePointer.stop(e));
        },
        requestPointerLock: function () {
          if (this.game.device.pointerLock) {
            var e = this.game.canvas;
            (e.requestPointerLock =
              e.requestPointerLock ||
              e.mozRequestPointerLock ||
              e.webkitRequestPointerLock),
              e.requestPointerLock();
            var t = this;
            (this._pointerLockChange = function (e) {
              return t.pointerLockChange(e);
            }),
              document.addEventListener(
                "pointerlockchange",
                this._pointerLockChange,
                !0
              ),
              document.addEventListener(
                "mozpointerlockchange",
                this._pointerLockChange,
                !0
              ),
              document.addEventListener(
                "webkitpointerlockchange",
                this._pointerLockChange,
                !0
              );
          }
        },
        pointerLockChange: function (e) {
          var t = this.game.canvas;
          document.pointerLockElement === t ||
          document.mozPointerLockElement === t ||
          document.webkitPointerLockElement === t
            ? ((this.locked = !0), this.pointerLock.dispatch(!0, e))
            : ((this.locked = !1), this.pointerLock.dispatch(!1, e));
        },
        releasePointerLock: function () {
          (document.exitPointerLock =
            document.exitPointerLock ||
            document.mozExitPointerLock ||
            document.webkitExitPointerLock),
            document.exitPointerLock(),
            document.removeEventListener(
              "pointerlockchange",
              this._pointerLockChange,
              !0
            ),
            document.removeEventListener(
              "mozpointerlockchange",
              this._pointerLockChange,
              !0
            ),
            document.removeEventListener(
              "webkitpointerlockchange",
              this._pointerLockChange,
              !0
            );
        },
        stop: function () {
          this.game.canvas.removeEventListener(
            "mousedown",
            this._onMouseDown,
            !0
          ),
            this.game.canvas.removeEventListener(
              "mousemove",
              this._onMouseMove,
              !0
            ),
            this.game.canvas.removeEventListener(
              "mouseup",
              this._onMouseUp,
              !0
            );
        },
      }),
      (t.Mouse.prototype.constructor = t.Mouse),
      (t.MSPointer = function (e) {
        (this.game = e),
          (this.callbackContext = this.game),
          (this.disabled = !1),
          (this._onMSPointerDown = null),
          (this._onMSPointerMove = null),
          (this._onMSPointerUp = null);
      }),
      (t.MSPointer.prototype = {
        start: function () {
          if (null === this._onMSPointerDown) {
            var e = this;
            this.game.device.mspointer === !0 &&
              ((this._onMSPointerDown = function (t) {
                return e.onPointerDown(t);
              }),
              (this._onMSPointerMove = function (t) {
                return e.onPointerMove(t);
              }),
              (this._onMSPointerUp = function (t) {
                return e.onPointerUp(t);
              }),
              this.game.renderer.view.addEventListener(
                "MSPointerDown",
                this._onMSPointerDown,
                !1
              ),
              this.game.renderer.view.addEventListener(
                "MSPointerMove",
                this._onMSPointerMove,
                !1
              ),
              this.game.renderer.view.addEventListener(
                "MSPointerUp",
                this._onMSPointerUp,
                !1
              ),
              this.game.renderer.view.addEventListener(
                "pointerDown",
                this._onMSPointerDown,
                !1
              ),
              this.game.renderer.view.addEventListener(
                "pointerMove",
                this._onMSPointerMove,
                !1
              ),
              this.game.renderer.view.addEventListener(
                "pointerUp",
                this._onMSPointerUp,
                !1
              ),
              (this.game.renderer.view.style["-ms-content-zooming"] = "none"),
              (this.game.renderer.view.style["-ms-touch-action"] = "none"));
          }
        },
        onPointerDown: function (e) {
          this.game.input.disabled ||
            this.disabled ||
            (e.preventDefault(),
            (e.identifier = e.pointerId),
            this.game.input.startPointer(e));
        },
        onPointerMove: function (e) {
          this.game.input.disabled ||
            this.disabled ||
            (e.preventDefault(),
            (e.identifier = e.pointerId),
            this.game.input.updatePointer(e));
        },
        onPointerUp: function (e) {
          this.game.input.disabled ||
            this.disabled ||
            (e.preventDefault(),
            (e.identifier = e.pointerId),
            this.game.input.stopPointer(e));
        },
        stop: function () {
          this.game.canvas.removeEventListener(
            "MSPointerDown",
            this._onMSPointerDown
          ),
            this.game.canvas.removeEventListener(
              "MSPointerMove",
              this._onMSPointerMove
            ),
            this.game.canvas.removeEventListener(
              "MSPointerUp",
              this._onMSPointerUp
            ),
            this.game.canvas.removeEventListener(
              "pointerDown",
              this._onMSPointerDown
            ),
            this.game.canvas.removeEventListener(
              "pointerMove",
              this._onMSPointerMove
            ),
            this.game.canvas.removeEventListener(
              "pointerUp",
              this._onMSPointerUp
            );
        },
      }),
      (t.MSPointer.prototype.constructor = t.MSPointer),
      (t.Pointer = function (e, n) {
        (this.game = e),
          (this.id = n),
          (this._holdSent = !1),
          (this._history = []),
          (this._nextDrop = 0),
          (this._stateReset = !1),
          (this.withinGame = !1),
          (this.clientX = -1),
          (this.clientY = -1),
          (this.pageX = -1),
          (this.pageY = -1),
          (this.screenX = -1),
          (this.screenY = -1),
          (this.x = -1),
          (this.y = -1),
          (this.isMouse = !1),
          (this.isDown = !1),
          (this.isUp = !0),
          (this.timeDown = 0),
          (this.timeUp = 0),
          (this.previousTapTime = 0),
          (this.totalTouches = 0),
          (this.msSinceLastClick = Number.MAX_VALUE),
          (this.targetObject = null),
          (this.active = !1),
          (this.position = new t.Point()),
          (this.positionDown = new t.Point()),
          (this.circle = new t.Circle(0, 0, 44)),
          0 === n && (this.isMouse = !0);
      }),
      (t.Pointer.prototype = {
        start: function (e) {
          return (
            (this.identifier = e.identifier),
            (this.target = e.target),
            "undefined" != typeof e.button && (this.button = e.button),
            (this._history.length = 0),
            (this.active = !0),
            (this.withinGame = !0),
            (this.isDown = !0),
            (this.isUp = !1),
            (this.msSinceLastClick = this.game.time.now - this.timeDown),
            (this.timeDown = this.game.time.now),
            (this._holdSent = !1),
            this.move(e, !0),
            this.positionDown.setTo(this.x, this.y),
            (this.game.input.multiInputOverride ===
              t.Input.MOUSE_OVERRIDES_TOUCH ||
              this.game.input.multiInputOverride ===
                t.Input.MOUSE_TOUCH_COMBINE ||
              (this.game.input.multiInputOverride ===
                t.Input.TOUCH_OVERRIDES_MOUSE &&
                0 === this.game.input.currentPointers)) &&
              ((this.game.input.x = this.x),
              (this.game.input.y = this.y),
              this.game.input.position.setTo(this.x, this.y),
              this.game.input.onDown.dispatch(this, e),
              this.game.input.resetSpeed(this.x, this.y)),
            (this._stateReset = !1),
            this.totalTouches++,
            this.isMouse || this.game.input.currentPointers++,
            null !== this.targetObject &&
              this.targetObject._touchedHandler(this),
            this
          );
        },
        update: function () {
          this.active &&
            (this._holdSent === !1 &&
              this.duration >= this.game.input.holdRate &&
              ((this.game.input.multiInputOverride ==
                t.Input.MOUSE_OVERRIDES_TOUCH ||
                this.game.input.multiInputOverride ==
                  t.Input.MOUSE_TOUCH_COMBINE ||
                (this.game.input.multiInputOverride ==
                  t.Input.TOUCH_OVERRIDES_MOUSE &&
                  0 === this.game.input.currentPointers)) &&
                this.game.input.onHold.dispatch(this),
              (this._holdSent = !0)),
            this.game.input.recordPointerHistory &&
              this.game.time.now >= this._nextDrop &&
              ((this._nextDrop =
                this.game.time.now + this.game.input.recordRate),
              this._history.push({ x: this.position.x, y: this.position.y }),
              this._history.length > this.game.input.recordLimit &&
                this._history.shift()));
        },
        move: function (e, n) {
          if (!this.game.input.pollLocked) {
            if (
              ("undefined" == typeof n && (n = !1),
              "undefined" != typeof e.button && (this.button = e.button),
              (this.clientX = e.clientX),
              (this.clientY = e.clientY),
              (this.pageX = e.pageX),
              (this.pageY = e.pageY),
              (this.screenX = e.screenX),
              (this.screenY = e.screenY),
              (this.x =
                (this.pageX - this.game.stage.offset.x) *
                this.game.input.scale.x),
              (this.y =
                (this.pageY - this.game.stage.offset.y) *
                this.game.input.scale.y),
              this.position.setTo(this.x, this.y),
              (this.circle.x = this.x),
              (this.circle.y = this.y),
              (this.game.input.multiInputOverride ==
                t.Input.MOUSE_OVERRIDES_TOUCH ||
                this.game.input.multiInputOverride ==
                  t.Input.MOUSE_TOUCH_COMBINE ||
                (this.game.input.multiInputOverride ==
                  t.Input.TOUCH_OVERRIDES_MOUSE &&
                  0 === this.game.input.currentPointers)) &&
                ((this.game.input.activePointer = this),
                (this.game.input.x = this.x),
                (this.game.input.y = this.y),
                this.game.input.position.setTo(
                  this.game.input.x,
                  this.game.input.y
                ),
                (this.game.input.circle.x = this.game.input.x),
                (this.game.input.circle.y = this.game.input.y)),
              this.game.paused)
            )
              return this;
            if (
              (this.game.input.moveCallback &&
                this.game.input.moveCallback.call(
                  this.game.input.moveCallbackContext,
                  this,
                  this.x,
                  this.y
                ),
              null !== this.targetObject && this.targetObject.isDragged === !0)
            )
              return (
                this.targetObject.update(this) === !1 &&
                  (this.targetObject = null),
                this
              );
            if (
              ((this._highestRenderOrderID = Number.MAX_SAFE_INTEGER),
              (this._highestRenderObject = null),
              (this._highestInputPriorityID = -1),
              this.game.input.interactiveItems.total > 0)
            ) {
              var r = this.game.input.interactiveItems.next;
              do
                r.validForInput(
                  this._highestInputPriorityID,
                  this._highestRenderOrderID
                ) &&
                  ((!n && r.checkPointerOver(this)) ||
                    (n && r.checkPointerDown(this))) &&
                  ((this._highestRenderOrderID = r.sprite._cache[3]),
                  (this._highestInputPriorityID = r.priorityID),
                  (this._highestRenderObject = r)),
                  (r = r.next);
              while (null != r);
            }
            return (
              null === this._highestRenderObject
                ? this.targetObject &&
                  (this.targetObject._pointerOutHandler(this),
                  (this.targetObject = null))
                : null === this.targetObject
                ? ((this.targetObject = this._highestRenderObject),
                  this._highestRenderObject._pointerOverHandler(this))
                : this.targetObject === this._highestRenderObject
                ? this._highestRenderObject.update(this) === !1 &&
                  (this.targetObject = null)
                : (this.targetObject._pointerOutHandler(this),
                  (this.targetObject = this._highestRenderObject),
                  this.targetObject._pointerOverHandler(this)),
              this
            );
          }
        },
        leave: function (e) {
          (this.withinGame = !1), this.move(e, !1);
        },
        stop: function (e) {
          if (this._stateReset) return void e.preventDefault();
          if (
            ((this.timeUp = this.game.time.now),
            (this.game.input.multiInputOverride ==
              t.Input.MOUSE_OVERRIDES_TOUCH ||
              this.game.input.multiInputOverride ==
                t.Input.MOUSE_TOUCH_COMBINE ||
              (this.game.input.multiInputOverride ==
                t.Input.TOUCH_OVERRIDES_MOUSE &&
                0 === this.game.input.currentPointers)) &&
              (this.game.input.onUp.dispatch(this, e),
              this.duration >= 0 &&
                this.duration <= this.game.input.tapRate &&
                (this.timeUp - this.previousTapTime <
                this.game.input.doubleTapRate
                  ? this.game.input.onTap.dispatch(this, !0)
                  : this.game.input.onTap.dispatch(this, !1),
                (this.previousTapTime = this.timeUp))),
            this.id > 0 && (this.active = !1),
            (this.withinGame = !1),
            (this.isDown = !1),
            (this.isUp = !0),
            this.isMouse === !1 && this.game.input.currentPointers--,
            this.game.input.interactiveItems.total > 0)
          ) {
            var n = this.game.input.interactiveItems.next;
            do n && n._releasedHandler(this), (n = n.next);
            while (null != n);
          }
          return (
            this.targetObject && this.targetObject._releasedHandler(this),
            (this.targetObject = null),
            this
          );
        },
        justPressed: function (e) {
          return (
            (e = e || this.game.input.justPressedRate),
            this.isDown === !0 && this.timeDown + e > this.game.time.now
          );
        },
        justReleased: function (e) {
          return (
            (e = e || this.game.input.justReleasedRate),
            this.isUp === !0 && this.timeUp + e > this.game.time.now
          );
        },
        reset: function () {
          this.isMouse === !1 && (this.active = !1),
            (this.identifier = null),
            (this.isDown = !1),
            (this.isUp = !0),
            (this.totalTouches = 0),
            (this._holdSent = !1),
            (this._history.length = 0),
            (this._stateReset = !0),
            this.targetObject && this.targetObject._releasedHandler(this),
            (this.targetObject = null);
        },
      }),
      (t.Pointer.prototype.constructor = t.Pointer),
      Object.defineProperty(t.Pointer.prototype, "duration", {
        get: function () {
          return this.isUp ? -1 : this.game.time.now - this.timeDown;
        },
      }),
      Object.defineProperty(t.Pointer.prototype, "worldX", {
        get: function () {
          return this.game.world.camera.x + this.x;
        },
      }),
      Object.defineProperty(t.Pointer.prototype, "worldY", {
        get: function () {
          return this.game.world.camera.y + this.y;
        },
      }),
      (t.Touch = function (e) {
        (this.game = e),
          (this.disabled = !1),
          (this.callbackContext = this.game),
          (this.touchStartCallback = null),
          (this.touchMoveCallback = null),
          (this.touchEndCallback = null),
          (this.touchEnterCallback = null),
          (this.touchLeaveCallback = null),
          (this.touchCancelCallback = null),
          (this.preventDefault = !0),
          (this.event = null),
          (this._onTouchStart = null),
          (this._onTouchMove = null),
          (this._onTouchEnd = null),
          (this._onTouchEnter = null),
          (this._onTouchLeave = null),
          (this._onTouchCancel = null),
          (this._onTouchMove = null);
      }),
      (t.Touch.prototype = {
        start: function () {
          if (null === this._onTouchStart) {
            var e = this;
            this.game.device.touch &&
              ((this._onTouchStart = function (t) {
                return e.onTouchStart(t);
              }),
              (this._onTouchMove = function (t) {
                return e.onTouchMove(t);
              }),
              (this._onTouchEnd = function (t) {
                return e.onTouchEnd(t);
              }),
              (this._onTouchEnter = function (t) {
                return e.onTouchEnter(t);
              }),
              (this._onTouchLeave = function (t) {
                return e.onTouchLeave(t);
              }),
              (this._onTouchCancel = function (t) {
                return e.onTouchCancel(t);
              }),
              this.game.canvas.addEventListener(
                "touchstart",
                this._onTouchStart,
                !1
              ),
              this.game.canvas.addEventListener(
                "touchmove",
                this._onTouchMove,
                !1
              ),
              this.game.canvas.addEventListener(
                "touchend",
                this._onTouchEnd,
                !1
              ),
              this.game.canvas.addEventListener(
                "touchenter",
                this._onTouchEnter,
                !1
              ),
              this.game.canvas.addEventListener(
                "touchleave",
                this._onTouchLeave,
                !1
              ),
              this.game.canvas.addEventListener(
                "touchcancel",
                this._onTouchCancel,
                !1
              ));
          }
        },
        consumeDocumentTouches: function () {
          (this._documentTouchMove = function (e) {
            e.preventDefault();
          }),
            document.addEventListener("touchmove", this._documentTouchMove, !1);
        },
        onTouchStart: function (e) {
          if (
            ((this.event = e),
            this.touchStartCallback &&
              this.touchStartCallback.call(this.callbackContext, e),
            !this.game.input.disabled && !this.disabled)
          ) {
            this.preventDefault && e.preventDefault();
            for (var t = 0; t < e.changedTouches.length; t++)
              this.game.input.startPointer(e.changedTouches[t]);
          }
        },
        onTouchCancel: function (e) {
          if (
            ((this.event = e),
            this.touchCancelCallback &&
              this.touchCancelCallback.call(this.callbackContext, e),
            !this.game.input.disabled && !this.disabled)
          ) {
            this.preventDefault && e.preventDefault();
            for (var t = 0; t < e.changedTouches.length; t++)
              this.game.input.stopPointer(e.changedTouches[t]);
          }
        },
        onTouchEnter: function (e) {
          (this.event = e),
            this.touchEnterCallback &&
              this.touchEnterCallback.call(this.callbackContext, e),
            this.game.input.disabled ||
              this.disabled ||
              (this.preventDefault && e.preventDefault());
        },
        onTouchLeave: function (e) {
          (this.event = e),
            this.touchLeaveCallback &&
              this.touchLeaveCallback.call(this.callbackContext, e),
            this.preventDefault && e.preventDefault();
        },
        onTouchMove: function (e) {
          (this.event = e),
            this.touchMoveCallback &&
              this.touchMoveCallback.call(this.callbackContext, e),
            this.preventDefault && e.preventDefault();
          for (var t = 0; t < e.changedTouches.length; t++)
            this.game.input.updatePointer(e.changedTouches[t]);
        },
        onTouchEnd: function (e) {
          (this.event = e),
            this.touchEndCallback &&
              this.touchEndCallback.call(this.callbackContext, e),
            this.preventDefault && e.preventDefault();
          for (var t = 0; t < e.changedTouches.length; t++)
            this.game.input.stopPointer(e.changedTouches[t]);
        },
        stop: function () {
          this.game.device.touch &&
            (this.game.canvas.removeEventListener(
              "touchstart",
              this._onTouchStart
            ),
            this.game.canvas.removeEventListener(
              "touchmove",
              this._onTouchMove
            ),
            this.game.canvas.removeEventListener("touchend", this._onTouchEnd),
            this.game.canvas.removeEventListener(
              "touchenter",
              this._onTouchEnter
            ),
            this.game.canvas.removeEventListener(
              "touchleave",
              this._onTouchLeave
            ),
            this.game.canvas.removeEventListener(
              "touchcancel",
              this._onTouchCancel
            ));
        },
      }),
      (t.Touch.prototype.constructor = t.Touch),
      (t.Gamepad = function (e) {
        (this.game = e),
          (this._gamepads = [
            new t.SinglePad(e, this),
            new t.SinglePad(e, this),
            new t.SinglePad(e, this),
            new t.SinglePad(e, this),
          ]),
          (this._gamepadIndexMap = {}),
          (this._rawPads = []),
          (this._active = !1),
          (this.disabled = !1),
          (this._gamepadSupportAvailable =
            !!navigator.webkitGetGamepads ||
            !!navigator.webkitGamepads ||
            -1 != navigator.userAgent.indexOf("Firefox/") ||
            !!navigator.getGamepads),
          (this._prevRawGamepadTypes = []),
          (this._prevTimestamps = []),
          (this.callbackContext = this),
          (this.onConnectCallback = null),
          (this.onDisconnectCallback = null),
          (this.onDownCallback = null),
          (this.onUpCallback = null),
          (this.onAxisCallback = null),
          (this.onFloatCallback = null),
          (this._ongamepadconnected = null),
          (this._gamepaddisconnected = null);
      }),
      (t.Gamepad.prototype = {
        addCallbacks: function (e, t) {
          "undefined" != typeof t &&
            ((this.onConnectCallback =
              "function" == typeof t.onConnect
                ? t.onConnect
                : this.onConnectCallback),
            (this.onDisconnectCallback =
              "function" == typeof t.onDisconnect
                ? t.onDisconnect
                : this.onDisconnectCallback),
            (this.onDownCallback =
              "function" == typeof t.onDown ? t.onDown : this.onDownCallback),
            (this.onUpCallback =
              "function" == typeof t.onUp ? t.onUp : this.onUpCallback),
            (this.onAxisCallback =
              "function" == typeof t.onAxis ? t.onAxis : this.onAxisCallback),
            (this.onFloatCallback =
              "function" == typeof t.onFloat
                ? t.onFloat
                : this.onFloatCallback));
        },
        start: function () {
          if (!this._active) {
            this._active = !0;
            var e = this;
            (this._ongamepadconnected = function (t) {
              var n = t.gamepad;
              e._rawPads.push(n), e._gamepads[n.index].connect(n);
            }),
              window.addEventListener(
                "gamepadconnected",
                this._ongamepadconnected,
                !1
              ),
              (this._ongamepaddisconnected = function (t) {
                var n = t.gamepad;
                for (var r in e._rawPads)
                  e._rawPads[r].index === n.index && e._rawPads.splice(r, 1);
                e._gamepads[n.index].disconnect();
              }),
              window.addEventListener(
                "gamepaddisconnected",
                this._ongamepaddisconnected,
                !1
              );
          }
        },
        update: function () {
          this._pollGamepads();
          for (var e = 0; e < this._gamepads.length; e++)
            this._gamepads[e]._connected && this._gamepads[e].pollStatus();
        },
        _pollGamepads: function () {
          var e =
            navigator.getGamepads ||
            (navigator.webkitGetGamepads && navigator.webkitGetGamepads()) ||
            navigator.webkitGamepads;
          if (e) {
            this._rawPads = [];
            for (
              var t = !1, n = 0;
              n < e.length &&
              (typeof e[n] !== this._prevRawGamepadTypes[n] &&
                ((t = !0), (this._prevRawGamepadTypes[n] = typeof e[n])),
              e[n] && this._rawPads.push(e[n]),
              3 !== n);
              n++
            );
            if (t) {
              for (
                var r, i = { rawIndices: {}, padIndices: {} }, s = 0;
                s < this._gamepads.length;
                s++
              )
                if (((r = this._gamepads[s]), r.connected))
                  for (var o = 0; o < this._rawPads.length; o++)
                    this._rawPads[o].index === r.index &&
                      ((i.rawIndices[r.index] = !0), (i.padIndices[s] = !0));
              for (var u = 0; u < this._gamepads.length; u++)
                if (((r = this._gamepads[u]), !i.padIndices[u])) {
                  this._rawPads.length < 1 && r.disconnect();
                  for (
                    var a = 0;
                    a < this._rawPads.length && !i.padIndices[u];
                    a++
                  ) {
                    var f = this._rawPads[a];
                    if (f) {
                      if (i.rawIndices[f.index]) {
                        r.disconnect();
                        continue;
                      }
                      r.connect(f),
                        (i.rawIndices[f.index] = !0),
                        (i.padIndices[u] = !0);
                    } else r.disconnect();
                  }
                }
            }
          }
        },
        setDeadZones: function (e) {
          for (var t = 0; t < this._gamepads.length; t++)
            this._gamepads[t].deadZone = e;
        },
        stop: function () {
          (this._active = !1),
            window.removeEventListener(
              "gamepadconnected",
              this._ongamepadconnected
            ),
            window.removeEventListener(
              "gamepaddisconnected",
              this._ongamepaddisconnected
            );
        },
        reset: function () {
          this.update();
          for (var e = 0; e < this._gamepads.length; e++)
            this._gamepads[e].reset();
        },
        justPressed: function (e, t) {
          for (var n = 0; n < this._gamepads.length; n++)
            if (this._gamepads[n].justPressed(e, t) === !0) return !0;
          return !1;
        },
        justReleased: function (e, t) {
          for (var n = 0; n < this._gamepads.length; n++)
            if (this._gamepads[n].justReleased(e, t) === !0) return !0;
          return !1;
        },
        isDown: function (e) {
          for (var t = 0; t < this._gamepads.length; t++)
            if (this._gamepads[t].isDown(e) === !0) return !0;
          return !1;
        },
      }),
      (t.Gamepad.prototype.constructor = t.Gamepad),
      Object.defineProperty(t.Gamepad.prototype, "active", {
        get: function () {
          return this._active;
        },
      }),
      Object.defineProperty(t.Gamepad.prototype, "supported", {
        get: function () {
          return this._gamepadSupportAvailable;
        },
      }),
      Object.defineProperty(t.Gamepad.prototype, "padsConnected", {
        get: function () {
          return this._rawPads.length;
        },
      }),
      Object.defineProperty(t.Gamepad.prototype, "pad1", {
        get: function () {
          return this._gamepads[0];
        },
      }),
      Object.defineProperty(t.Gamepad.prototype, "pad2", {
        get: function () {
          return this._gamepads[1];
        },
      }),
      Object.defineProperty(t.Gamepad.prototype, "pad3", {
        get: function () {
          return this._gamepads[2];
        },
      }),
      Object.defineProperty(t.Gamepad.prototype, "pad4", {
        get: function () {
          return this._gamepads[3];
        },
      }),
      (t.Gamepad.BUTTON_0 = 0),
      (t.Gamepad.BUTTON_1 = 1),
      (t.Gamepad.BUTTON_2 = 2),
      (t.Gamepad.BUTTON_3 = 3),
      (t.Gamepad.BUTTON_4 = 4),
      (t.Gamepad.BUTTON_5 = 5),
      (t.Gamepad.BUTTON_6 = 6),
      (t.Gamepad.BUTTON_7 = 7),
      (t.Gamepad.BUTTON_8 = 8),
      (t.Gamepad.BUTTON_9 = 9),
      (t.Gamepad.BUTTON_10 = 10),
      (t.Gamepad.BUTTON_11 = 11),
      (t.Gamepad.BUTTON_12 = 12),
      (t.Gamepad.BUTTON_13 = 13),
      (t.Gamepad.BUTTON_14 = 14),
      (t.Gamepad.BUTTON_15 = 15),
      (t.Gamepad.AXIS_0 = 0),
      (t.Gamepad.AXIS_1 = 1),
      (t.Gamepad.AXIS_2 = 2),
      (t.Gamepad.AXIS_3 = 3),
      (t.Gamepad.AXIS_4 = 4),
      (t.Gamepad.AXIS_5 = 5),
      (t.Gamepad.AXIS_6 = 6),
      (t.Gamepad.AXIS_7 = 7),
      (t.Gamepad.AXIS_8 = 8),
      (t.Gamepad.AXIS_9 = 9),
      (t.Gamepad.XBOX360_A = 0),
      (t.Gamepad.XBOX360_B = 1),
      (t.Gamepad.XBOX360_X = 2),
      (t.Gamepad.XBOX360_Y = 3),
      (t.Gamepad.XBOX360_LEFT_BUMPER = 4),
      (t.Gamepad.XBOX360_RIGHT_BUMPER = 5),
      (t.Gamepad.XBOX360_LEFT_TRIGGER = 6),
      (t.Gamepad.XBOX360_RIGHT_TRIGGER = 7),
      (t.Gamepad.XBOX360_BACK = 8),
      (t.Gamepad.XBOX360_START = 9),
      (t.Gamepad.XBOX360_STICK_LEFT_BUTTON = 10),
      (t.Gamepad.XBOX360_STICK_RIGHT_BUTTON = 11),
      (t.Gamepad.XBOX360_DPAD_LEFT = 14),
      (t.Gamepad.XBOX360_DPAD_RIGHT = 15),
      (t.Gamepad.XBOX360_DPAD_UP = 12),
      (t.Gamepad.XBOX360_DPAD_DOWN = 13),
      (t.Gamepad.XBOX360_STICK_LEFT_X = 0),
      (t.Gamepad.XBOX360_STICK_LEFT_Y = 1),
      (t.Gamepad.XBOX360_STICK_RIGHT_X = 2),
      (t.Gamepad.XBOX360_STICK_RIGHT_Y = 3),
      (t.SinglePad = function (e, t) {
        (this.game = e),
          (this._padParent = t),
          (this._index = null),
          (this._rawPad = null),
          (this._connected = !1),
          (this._prevTimestamp = null),
          (this._rawButtons = []),
          (this._buttons = []),
          (this._axes = []),
          (this._hotkeys = []),
          (this.callbackContext = this),
          (this.onConnectCallback = null),
          (this.onDisconnectCallback = null),
          (this.onDownCallback = null),
          (this.onUpCallback = null),
          (this.onAxisCallback = null),
          (this.onFloatCallback = null),
          (this.deadZone = 0.26);
      }),
      (t.SinglePad.prototype = {
        addCallbacks: function (e, t) {
          "undefined" != typeof t &&
            ((this.onConnectCallback =
              "function" == typeof t.onConnect
                ? t.onConnect
                : this.onConnectCallback),
            (this.onDisconnectCallback =
              "function" == typeof t.onDisconnect
                ? t.onDisconnect
                : this.onDisconnectCallback),
            (this.onDownCallback =
              "function" == typeof t.onDown ? t.onDown : this.onDownCallback),
            (this.onUpCallback =
              "function" == typeof t.onUp ? t.onUp : this.onUpCallback),
            (this.onAxisCallback =
              "function" == typeof t.onAxis ? t.onAxis : this.onAxisCallback),
            (this.onFloatCallback =
              "function" == typeof t.onFloat
                ? t.onFloat
                : this.onFloatCallback));
        },
        addButton: function (e) {
          return (
            (this._hotkeys[e] = new t.GamepadButton(this.game, e)),
            this._hotkeys[e]
          );
        },
        pollStatus: function () {
          if (
            !this._rawPad.timestamp ||
            this._rawPad.timestamp != this._prevTimestamp
          ) {
            for (var e = 0; e < this._rawPad.buttons.length; e += 1) {
              var t = this._rawPad.buttons[e];
              this._rawButtons[e] !== t &&
                (1 === t
                  ? this.processButtonDown(e, t)
                  : 0 === t
                  ? this.processButtonUp(e, t)
                  : this.processButtonFloat(e, t),
                (this._rawButtons[e] = t));
            }
            for (var n = this._rawPad.axes, r = 0; r < n.length; r += 1) {
              var i = n[r];
              this.processAxisChange(
                (i > 0 && i > this.deadZone) || (0 > i && i < -this.deadZone)
                  ? { axis: r, value: i }
                  : { axis: r, value: 0 }
              );
            }
            this._prevTimestamp = this._rawPad.timestamp;
          }
        },
        connect: function (e) {
          var t = !this._connected;
          (this._index = e.index),
            (this._connected = !0),
            (this._rawPad = e),
            (this._rawButtons = e.buttons),
            (this._axes = e.axes),
            t &&
              this._padParent.onConnectCallback &&
              this._padParent.onConnectCallback.call(
                this._padParent.callbackContext,
                this._index
              ),
            t &&
              this.onConnectCallback &&
              this.onConnectCallback.call(this.callbackContext);
        },
        disconnect: function () {
          var e = this._connected;
          (this._connected = !1),
            (this._rawPad = void 0),
            (this._rawButtons = []),
            (this._buttons = []);
          var t = this._index;
          (this._index = null),
            e &&
              this._padParent.onDisconnectCallback &&
              this._padParent.onDisconnectCallback.call(
                this._padParent.callbackContext,
                t
              ),
            e &&
              this.onDisconnectCallback &&
              this.onDisconnectCallback.call(this.callbackContext);
        },
        processAxisChange: function (e) {
          this.game.input.disabled ||
            this.game.input.gamepad.disabled ||
            (this._axes[e.axis] !== e.value &&
              ((this._axes[e.axis] = e.value),
              this._padParent.onAxisCallback &&
                this._padParent.onAxisCallback.call(
                  this._padParent.callbackContext,
                  e,
                  this._index
                ),
              this.onAxisCallback &&
                this.onAxisCallback.call(this.callbackContext, e)));
        },
        processButtonDown: function (e, t) {
          this.game.input.disabled ||
            this.game.input.gamepad.disabled ||
            (this._padParent.onDownCallback &&
              this._padParent.onDownCallback.call(
                this._padParent.callbackContext,
                e,
                t,
                this._index
              ),
            this.onDownCallback &&
              this.onDownCallback.call(this.callbackContext, e, t),
            this._buttons[e] && this._buttons[e].isDown
              ? (this._buttons[e].duration =
                  this.game.time.now - this._buttons[e].timeDown)
              : this._buttons[e]
              ? ((this._buttons[e].isDown = !0),
                (this._buttons[e].timeDown = this.game.time.now),
                (this._buttons[e].duration = 0),
                (this._buttons[e].value = t))
              : (this._buttons[e] = {
                  isDown: !0,
                  timeDown: this.game.time.now,
                  timeUp: 0,
                  duration: 0,
                  value: t,
                }),
            this._hotkeys[e] && this._hotkeys[e].processButtonDown(t));
        },
        processButtonUp: function (e, t) {
          this.game.input.disabled ||
            this.game.input.gamepad.disabled ||
            (this._padParent.onUpCallback &&
              this._padParent.onUpCallback.call(
                this._padParent.callbackContext,
                e,
                t,
                this._index
              ),
            this.onUpCallback &&
              this.onUpCallback.call(this.callbackContext, e, t),
            this._hotkeys[e] && this._hotkeys[e].processButtonUp(t),
            this._buttons[e]
              ? ((this._buttons[e].isDown = !1),
                (this._buttons[e].timeUp = this.game.time.now),
                (this._buttons[e].value = t))
              : (this._buttons[e] = {
                  isDown: !1,
                  timeDown: this.game.time.now,
                  timeUp: this.game.time.now,
                  duration: 0,
                  value: t,
                }));
        },
        processButtonFloat: function (e, t) {
          this.game.input.disabled ||
            this.game.input.gamepad.disabled ||
            (this._padParent.onFloatCallback &&
              this._padParent.onFloatCallback.call(
                this._padParent.callbackContext,
                e,
                t,
                this._index
              ),
            this.onFloatCallback &&
              this.onFloatCallback.call(this.callbackContext, e, t),
            this._buttons[e]
              ? (this._buttons[e].value = t)
              : (this._buttons[e] = { value: t }),
            this._hotkeys[e] && this._hotkeys[e].processButtonFloat(t));
        },
        axis: function (e) {
          return this._axes[e] ? this._axes[e] : !1;
        },
        isDown: function (e) {
          return this._buttons[e] ? this._buttons[e].isDown : !1;
        },
        justReleased: function (e, t) {
          return (
            "undefined" == typeof t && (t = 250),
            this._buttons[e] &&
              this._buttons[e].isDown === !1 &&
              this.game.time.now - this._buttons[e].timeUp < t
          );
        },
        justPressed: function (e, t) {
          return (
            "undefined" == typeof t && (t = 250),
            this._buttons[e] &&
              this._buttons[e].isDown &&
              this._buttons[e].duration < t
          );
        },
        buttonValue: function (e) {
          return this._buttons[e] ? this._buttons[e].value : !1;
        },
        reset: function () {
          for (var e = 0; e < this._buttons.length; e++) this._buttons[e] = 0;
          for (var t = 0; t < this._axes.length; t++) this._axes[t] = 0;
        },
      }),
      (t.SinglePad.prototype.constructor = t.SinglePad),
      Object.defineProperty(t.SinglePad.prototype, "connected", {
        get: function () {
          return this._connected;
        },
      }),
      Object.defineProperty(t.SinglePad.prototype, "index", {
        get: function () {
          return this._index;
        },
      }),
      (t.GamepadButton = function (e, n) {
        (this.game = e),
          (this.isDown = !1),
          (this.isUp = !0),
          (this.timeDown = 0),
          (this.duration = 0),
          (this.timeUp = 0),
          (this.repeats = 0),
          (this.value = 0),
          (this.buttonCode = n),
          (this.onDown = new t.Signal()),
          (this.onUp = new t.Signal()),
          (this.onFloat = new t.Signal());
      }),
      (t.GamepadButton.prototype = {
        processButtonDown: function (e) {
          this.isDown
            ? ((this.duration = this.game.time.now - this.timeDown),
              this.repeats++)
            : ((this.isDown = !0),
              (this.isUp = !1),
              (this.timeDown = this.game.time.now),
              (this.duration = 0),
              (this.repeats = 0),
              (this.value = e),
              this.onDown.dispatch(this, e));
        },
        processButtonUp: function (e) {
          (this.isDown = !1),
            (this.isUp = !0),
            (this.timeUp = this.game.time.now),
            (this.value = e),
            this.onUp.dispatch(this, e);
        },
        processButtonFloat: function (e) {
          (this.value = e), this.onFloat.dispatch(this, e);
        },
        justPressed: function (e) {
          return (
            "undefined" == typeof e && (e = 250),
            this.isDown && this.duration < e
          );
        },
        justReleased: function (e) {
          return (
            "undefined" == typeof e && (e = 250),
            this.isDown === !1 && this.game.time.now - this.timeUp < e
          );
        },
      }),
      (t.GamepadButton.prototype.constructor = t.GamepadButton),
      (t.InputHandler = function (e) {
        (this.sprite = e),
          (this.game = e.game),
          (this.enabled = !1),
          (this.priorityID = 0),
          (this.useHandCursor = !1),
          (this._setHandCursor = !1),
          (this.isDragged = !1),
          (this.allowHorizontalDrag = !0),
          (this.allowVerticalDrag = !0),
          (this.bringToTop = !1),
          (this.snapOffset = null),
          (this.snapOnDrag = !1),
          (this.snapOnRelease = !1),
          (this.snapX = 0),
          (this.snapY = 0),
          (this.snapOffsetX = 0),
          (this.snapOffsetY = 0),
          (this.pixelPerfectOver = !1),
          (this.pixelPerfectClick = !1),
          (this.pixelPerfectAlpha = 255),
          (this.draggable = !1),
          (this.boundsRect = null),
          (this.boundsSprite = null),
          (this.consumePointerEvent = !1),
          (this._tempPoint = new t.Point()),
          (this._pointerData = []),
          this._pointerData.push({
            id: 0,
            x: 0,
            y: 0,
            isDown: !1,
            isUp: !1,
            isOver: !1,
            isOut: !1,
            timeOver: 0,
            timeOut: 0,
            timeDown: 0,
            timeUp: 0,
            downDuration: 0,
            isDragged: !1,
          });
      }),
      (t.InputHandler.prototype = {
        start: function (e, n) {
          if (
            ((e = e || 0),
            "undefined" == typeof n && (n = !1),
            this.enabled === !1)
          ) {
            this.game.input.interactiveItems.add(this),
              (this.useHandCursor = n),
              (this.priorityID = e);
            for (var r = 0; 10 > r; r++)
              this._pointerData[r] = {
                id: r,
                x: 0,
                y: 0,
                isDown: !1,
                isUp: !1,
                isOver: !1,
                isOut: !1,
                timeOver: 0,
                timeOut: 0,
                timeDown: 0,
                timeUp: 0,
                downDuration: 0,
                isDragged: !1,
              };
            (this.snapOffset = new t.Point()),
              (this.enabled = !0),
              this.sprite.events &&
                null === this.sprite.events.onInputOver &&
                ((this.sprite.events.onInputOver = new t.Signal()),
                (this.sprite.events.onInputOut = new t.Signal()),
                (this.sprite.events.onInputDown = new t.Signal()),
                (this.sprite.events.onInputUp = new t.Signal()),
                (this.sprite.events.onDragStart = new t.Signal()),
                (this.sprite.events.onDragStop = new t.Signal()));
          }
          return this.sprite;
        },
        reset: function () {
          this.enabled = !1;
          for (var e = 0; 10 > e; e++)
            this._pointerData[e] = {
              id: e,
              x: 0,
              y: 0,
              isDown: !1,
              isUp: !1,
              isOver: !1,
              isOut: !1,
              timeOver: 0,
              timeOut: 0,
              timeDown: 0,
              timeUp: 0,
              downDuration: 0,
              isDragged: !1,
            };
        },
        stop: function () {
          this.enabled !== !1 &&
            ((this.enabled = !1),
            this.game.input.interactiveItems.remove(this));
        },
        destroy: function () {
          this.enabled &&
            (this._setHandCursor &&
              ((this.game.canvas.style.cursor = "default"),
              (this._setHandCursor = !1)),
            (this.enabled = !1),
            this.game.input.interactiveItems.remove(this),
            (this._pointerData.length = 0),
            (this.boundsRect = null),
            (this.boundsSprite = null),
            (this.sprite = null));
        },
        validForInput: function (e, t) {
          return 0 === this.sprite.scale.x || 0 === this.sprite.scale.y
            ? !1
            : this.pixelPerfectClick || this.pixelPerfectOver
            ? !0
            : this.priorityID > e ||
              (this.priorityID === e && this.sprite._cache[3] < t)
            ? !0
            : !1;
        },
        pointerX: function (e) {
          return (e = e || 0), this._pointerData[e].x;
        },
        pointerY: function (e) {
          return (e = e || 0), this._pointerData[e].y;
        },
        pointerDown: function (e) {
          return (e = e || 0), this._pointerData[e].isDown;
        },
        pointerUp: function (e) {
          return (e = e || 0), this._pointerData[e].isUp;
        },
        pointerTimeDown: function (e) {
          return (e = e || 0), this._pointerData[e].timeDown;
        },
        pointerTimeUp: function (e) {
          return (e = e || 0), this._pointerData[e].timeUp;
        },
        pointerOver: function (e) {
          if (this.enabled) {
            if ("undefined" != typeof e) return this._pointerData[e].isOver;
            for (var t = 0; 10 > t; t++)
              if (this._pointerData[t].isOver) return !0;
          }
          return !1;
        },
        pointerOut: function (e) {
          if (this.enabled) {
            if ("undefined" != typeof e) return this._pointerData[e].isOut;
            for (var t = 0; 10 > t; t++)
              if (this._pointerData[t].isOut) return !0;
          }
          return !1;
        },
        pointerTimeOver: function (e) {
          return (e = e || 0), this._pointerData[e].timeOver;
        },
        pointerTimeOut: function (e) {
          return (e = e || 0), this._pointerData[e].timeOut;
        },
        pointerDragged: function (e) {
          return (e = e || 0), this._pointerData[e].isDragged;
        },
        checkPointerDown: function (e) {
          return this.enabled === !1 ||
            this.sprite.visible === !1 ||
            this.sprite.parent.visible === !1
            ? !1
            : this.game.input.hitTest(this.sprite, e, this._tempPoint)
            ? this.pixelPerfectClick
              ? this.checkPixel(this._tempPoint.x, this._tempPoint.y)
              : !0
            : !1;
        },
        checkPointerOver: function (e) {
          return this.enabled === !1 ||
            this.sprite.visible === !1 ||
            this.sprite.parent.visible === !1
            ? !1
            : this.game.input.hitTest(this.sprite, e, this._tempPoint)
            ? this.pixelPerfectOver
              ? this.checkPixel(this._tempPoint.x, this._tempPoint.y)
              : !0
            : !1;
        },
        checkPixel: function (e, t, n) {
          if (this.sprite.texture.baseTexture.source) {
            if (
              (this.game.input.hitContext.clearRect(0, 0, 1, 1),
              null === e && null === t)
            ) {
              this.game.input.getLocalPosition(this.sprite, n, this._tempPoint);
              var e = this._tempPoint.x,
                t = this._tempPoint.y;
            }
            0 !== this.sprite.anchor.x &&
              (e -= -this.sprite.texture.frame.width * this.sprite.anchor.x),
              0 !== this.sprite.anchor.y &&
                (t -= -this.sprite.texture.frame.height * this.sprite.anchor.y),
              (e += this.sprite.texture.frame.x),
              (t += this.sprite.texture.frame.y),
              this.game.input.hitContext.drawImage(
                this.sprite.texture.baseTexture.source,
                e,
                t,
                1,
                1,
                0,
                0,
                1,
                1
              );
            var r = this.game.input.hitContext.getImageData(0, 0, 1, 1);
            if (r.data[3] >= this.pixelPerfectAlpha) return !0;
          }
          return !1;
        },
        update: function (e) {
          return null !== this.sprite
            ? this.enabled && this.sprite.visible && this.sprite.parent.visible
              ? this.draggable && this._draggedPointerID == e.id
                ? this.updateDrag(e)
                : this._pointerData[e.id].isOver === !0
                ? this.checkPointerOver(e)
                  ? ((this._pointerData[e.id].x = e.x - this.sprite.x),
                    (this._pointerData[e.id].y = e.y - this.sprite.y),
                    !0)
                  : (this._pointerOutHandler(e), !1)
                : void 0
              : (this._pointerOutHandler(e), !1)
            : void 0;
        },
        _pointerOverHandler: function (e) {
          null !== this.sprite &&
            this._pointerData[e.id].isOver === !1 &&
            ((this._pointerData[e.id].isOver = !0),
            (this._pointerData[e.id].isOut = !1),
            (this._pointerData[e.id].timeOver = this.game.time.now),
            (this._pointerData[e.id].x = e.x - this.sprite.x),
            (this._pointerData[e.id].y = e.y - this.sprite.y),
            this.useHandCursor &&
              this._pointerData[e.id].isDragged === !1 &&
              ((this.game.canvas.style.cursor = "pointer"),
              (this._setHandCursor = !1)),
            this.sprite.events.onInputOver.dispatch(this.sprite, e));
        },
        _pointerOutHandler: function (e) {
          null !== this.sprite &&
            ((this._pointerData[e.id].isOver = !1),
            (this._pointerData[e.id].isOut = !0),
            (this._pointerData[e.id].timeOut = this.game.time.now),
            this.useHandCursor &&
              this._pointerData[e.id].isDragged === !1 &&
              ((this.game.canvas.style.cursor = "default"),
              (this._setHandCursor = !1)),
            this.sprite &&
              this.sprite.events &&
              this.sprite.events.onInputOut.dispatch(this.sprite, e));
        },
        _touchedHandler: function (e) {
          if (null !== this.sprite) {
            if (
              this._pointerData[e.id].isDown === !1 &&
              this._pointerData[e.id].isOver === !0
            ) {
              if (this.pixelPerfectClick && !this.checkPixel(null, null, e))
                return;
              (this._pointerData[e.id].isDown = !0),
                (this._pointerData[e.id].isUp = !1),
                (this._pointerData[e.id].timeDown = this.game.time.now),
                this.sprite.events.onInputDown.dispatch(this.sprite, e),
                this.draggable && this.isDragged === !1 && this.startDrag(e),
                this.bringToTop && this.sprite.bringToTop();
            }
            return this.consumePointerEvent;
          }
        },
        _releasedHandler: function (e) {
          null !== this.sprite &&
            this._pointerData[e.id].isDown &&
            e.isUp &&
            ((this._pointerData[e.id].isDown = !1),
            (this._pointerData[e.id].isUp = !0),
            (this._pointerData[e.id].timeUp = this.game.time.now),
            (this._pointerData[e.id].downDuration =
              this._pointerData[e.id].timeUp -
              this._pointerData[e.id].timeDown),
            this.checkPointerOver(e)
              ? this.sprite.events.onInputUp.dispatch(this.sprite, e, !0)
              : (this.sprite.events.onInputUp.dispatch(this.sprite, e, !1),
                this.useHandCursor &&
                  ((this.game.canvas.style.cursor = "default"),
                  (this._setHandCursor = !1))),
            this.draggable &&
              this.isDragged &&
              this._draggedPointerID == e.id &&
              this.stopDrag(e));
        },
        updateDrag: function (e) {
          return e.isUp
            ? (this.stopDrag(e), !1)
            : (this.sprite.fixedToCamera
                ? (this.allowHorizontalDrag &&
                    (this.sprite.cameraOffset.x =
                      e.x + this._dragPoint.x + this.dragOffset.x),
                  this.allowVerticalDrag &&
                    (this.sprite.cameraOffset.y =
                      e.y + this._dragPoint.y + this.dragOffset.y),
                  this.boundsRect && this.checkBoundsRect(),
                  this.boundsSprite && this.checkBoundsSprite(),
                  this.snapOnDrag &&
                    ((this.sprite.cameraOffset.x =
                      Math.round(
                        (this.sprite.cameraOffset.x -
                          (this.snapOffsetX % this.snapX)) /
                          this.snapX
                      ) *
                        this.snapX +
                      (this.snapOffsetX % this.snapX)),
                    (this.sprite.cameraOffset.y =
                      Math.round(
                        (this.sprite.cameraOffset.y -
                          (this.snapOffsetY % this.snapY)) /
                          this.snapY
                      ) *
                        this.snapY +
                      (this.snapOffsetY % this.snapY))))
                : (this.allowHorizontalDrag &&
                    (this.sprite.x =
                      e.x + this._dragPoint.x + this.dragOffset.x),
                  this.allowVerticalDrag &&
                    (this.sprite.y =
                      e.y + this._dragPoint.y + this.dragOffset.y),
                  this.boundsRect && this.checkBoundsRect(),
                  this.boundsSprite && this.checkBoundsSprite(),
                  this.snapOnDrag &&
                    ((this.sprite.x =
                      Math.round(
                        (this.sprite.x - (this.snapOffsetX % this.snapX)) /
                          this.snapX
                      ) *
                        this.snapX +
                      (this.snapOffsetX % this.snapX)),
                    (this.sprite.y =
                      Math.round(
                        (this.sprite.y - (this.snapOffsetY % this.snapY)) /
                          this.snapY
                      ) *
                        this.snapY +
                      (this.snapOffsetY % this.snapY)))),
              !0);
        },
        justOver: function (e, t) {
          return (
            (e = e || 0),
            (t = t || 500),
            this._pointerData[e].isOver && this.overDuration(e) < t
          );
        },
        justOut: function (e, t) {
          return (
            (e = e || 0),
            (t = t || 500),
            this._pointerData[e].isOut &&
              this.game.time.now - this._pointerData[e].timeOut < t
          );
        },
        justPressed: function (e, t) {
          return (
            (e = e || 0),
            (t = t || 500),
            this._pointerData[e].isDown && this.downDuration(e) < t
          );
        },
        justReleased: function (e, t) {
          return (
            (e = e || 0),
            (t = t || 500),
            this._pointerData[e].isUp &&
              this.game.time.now - this._pointerData[e].timeUp < t
          );
        },
        overDuration: function (e) {
          return (
            (e = e || 0),
            this._pointerData[e].isOver
              ? this.game.time.now - this._pointerData[e].timeOver
              : -1
          );
        },
        downDuration: function (e) {
          return (
            (e = e || 0),
            this._pointerData[e].isDown
              ? this.game.time.now - this._pointerData[e].timeDown
              : -1
          );
        },
        enableDrag: function (e, n, r, i, s, o) {
          "undefined" == typeof e && (e = !1),
            "undefined" == typeof n && (n = !1),
            "undefined" == typeof r && (r = !1),
            "undefined" == typeof i && (i = 255),
            "undefined" == typeof s && (s = null),
            "undefined" == typeof o && (o = null),
            (this._dragPoint = new t.Point()),
            (this.draggable = !0),
            (this.bringToTop = n),
            (this.dragOffset = new t.Point()),
            (this.dragFromCenter = e),
            (this.pixelPerfect = r),
            (this.pixelPerfectAlpha = i),
            s && (this.boundsRect = s),
            o && (this.boundsSprite = o);
        },
        disableDrag: function () {
          if (this._pointerData)
            for (var e = 0; 10 > e; e++) this._pointerData[e].isDragged = !1;
          (this.draggable = !1),
            (this.isDragged = !1),
            (this._draggedPointerID = -1);
        },
        startDrag: function (e) {
          if (
            ((this.isDragged = !0),
            (this._draggedPointerID = e.id),
            (this._pointerData[e.id].isDragged = !0),
            this.sprite.fixedToCamera)
          )
            this.dragFromCenter
              ? (this.sprite.centerOn(e.x, e.y),
                this._dragPoint.setTo(
                  this.sprite.cameraOffset.x - e.x,
                  this.sprite.cameraOffset.y - e.y
                ))
              : this._dragPoint.setTo(
                  this.sprite.cameraOffset.x - e.x,
                  this.sprite.cameraOffset.y - e.y
                );
          else if (this.dragFromCenter) {
            var t = this.sprite.getBounds();
            (this.sprite.x = e.x + (this.sprite.x - t.centerX)),
              (this.sprite.y = e.y + (this.sprite.y - t.centerY)),
              this._dragPoint.setTo(this.sprite.x - e.x, this.sprite.y - e.y);
          } else
            this._dragPoint.setTo(this.sprite.x - e.x, this.sprite.y - e.y);
          this.updateDrag(e),
            this.bringToTop && this.sprite.bringToTop(),
            this.sprite.events.onDragStart.dispatch(this.sprite, e);
        },
        stopDrag: function (e) {
          (this.isDragged = !1),
            (this._draggedPointerID = -1),
            (this._pointerData[e.id].isDragged = !1),
            this.snapOnRelease &&
              (this.sprite.fixedToCamera
                ? ((this.sprite.cameraOffset.x =
                    Math.round(
                      (this.sprite.cameraOffset.x -
                        (this.snapOffsetX % this.snapX)) /
                        this.snapX
                    ) *
                      this.snapX +
                    (this.snapOffsetX % this.snapX)),
                  (this.sprite.cameraOffset.y =
                    Math.round(
                      (this.sprite.cameraOffset.y -
                        (this.snapOffsetY % this.snapY)) /
                        this.snapY
                    ) *
                      this.snapY +
                    (this.snapOffsetY % this.snapY)))
                : ((this.sprite.x =
                    Math.round(
                      (this.sprite.x - (this.snapOffsetX % this.snapX)) /
                        this.snapX
                    ) *
                      this.snapX +
                    (this.snapOffsetX % this.snapX)),
                  (this.sprite.y =
                    Math.round(
                      (this.sprite.y - (this.snapOffsetY % this.snapY)) /
                        this.snapY
                    ) *
                      this.snapY +
                    (this.snapOffsetY % this.snapY)))),
            this.sprite.events.onDragStop.dispatch(this.sprite, e),
            this.checkPointerOver(e) === !1 && this._pointerOutHandler(e);
        },
        setDragLock: function (e, t) {
          "undefined" == typeof e && (e = !0),
            "undefined" == typeof t && (t = !0),
            (this.allowHorizontalDrag = e),
            (this.allowVerticalDrag = t);
        },
        enableSnap: function (e, t, n, r, i, s) {
          "undefined" == typeof n && (n = !0),
            "undefined" == typeof r && (r = !1),
            "undefined" == typeof i && (i = 0),
            "undefined" == typeof s && (s = 0),
            (this.snapX = e),
            (this.snapY = t),
            (this.snapOffsetX = i),
            (this.snapOffsetY = s),
            (this.snapOnDrag = n),
            (this.snapOnRelease = r);
        },
        disableSnap: function () {
          (this.snapOnDrag = !1), (this.snapOnRelease = !1);
        },
        checkBoundsRect: function () {
          this.sprite.fixedToCamera
            ? (this.sprite.cameraOffset.x < this.boundsRect.left
                ? (this.sprite.cameraOffset.x = this.boundsRect.cameraOffset.x)
                : this.sprite.cameraOffset.x + this.sprite.width >
                    this.boundsRect.right &&
                  (this.sprite.cameraOffset.x =
                    this.boundsRect.right - this.sprite.width),
              this.sprite.cameraOffset.y < this.boundsRect.top
                ? (this.sprite.cameraOffset.y = this.boundsRect.top)
                : this.sprite.cameraOffset.y + this.sprite.height >
                    this.boundsRect.bottom &&
                  (this.sprite.cameraOffset.y =
                    this.boundsRect.bottom - this.sprite.height))
            : (this.sprite.x < this.boundsRect.left
                ? (this.sprite.x = this.boundsRect.x)
                : this.sprite.x + this.sprite.width > this.boundsRect.right &&
                  (this.sprite.x = this.boundsRect.right - this.sprite.width),
              this.sprite.y < this.boundsRect.top
                ? (this.sprite.y = this.boundsRect.top)
                : this.sprite.y + this.sprite.height > this.boundsRect.bottom &&
                  (this.sprite.y =
                    this.boundsRect.bottom - this.sprite.height));
        },
        checkBoundsSprite: function () {
          this.sprite.fixedToCamera && this.boundsSprite.fixedToCamera
            ? (this.sprite.cameraOffset.x < this.boundsSprite.camerOffset.x
                ? (this.sprite.cameraOffset.x = this.boundsSprite.camerOffset.x)
                : this.sprite.cameraOffset.x + this.sprite.width >
                    this.boundsSprite.camerOffset.x + this.boundsSprite.width &&
                  (this.sprite.cameraOffset.x =
                    this.boundsSprite.camerOffset.x +
                    this.boundsSprite.width -
                    this.sprite.width),
              this.sprite.cameraOffset.y < this.boundsSprite.camerOffset.y
                ? (this.sprite.cameraOffset.y = this.boundsSprite.camerOffset.y)
                : this.sprite.cameraOffset.y + this.sprite.height >
                    this.boundsSprite.camerOffset.y +
                      this.boundsSprite.height &&
                  (this.sprite.cameraOffset.y =
                    this.boundsSprite.camerOffset.y +
                    this.boundsSprite.height -
                    this.sprite.height))
            : (this.sprite.x < this.boundsSprite.x
                ? (this.sprite.x = this.boundsSprite.x)
                : this.sprite.x + this.sprite.width >
                    this.boundsSprite.x + this.boundsSprite.width &&
                  (this.sprite.x =
                    this.boundsSprite.x +
                    this.boundsSprite.width -
                    this.sprite.width),
              this.sprite.y < this.boundsSprite.y
                ? (this.sprite.y = this.boundsSprite.y)
                : this.sprite.y + this.sprite.height >
                    this.boundsSprite.y + this.boundsSprite.height &&
                  (this.sprite.y =
                    this.boundsSprite.y +
                    this.boundsSprite.height -
                    this.sprite.height));
        },
      }),
      (t.InputHandler.prototype.constructor = t.InputHandler),
      (t.Events = function (e) {
        (this.parent = e),
          (this.onAddedToGroup = new t.Signal()),
          (this.onRemovedFromGroup = new t.Signal()),
          (this.onKilled = new t.Signal()),
          (this.onRevived = new t.Signal()),
          (this.onOutOfBounds = new t.Signal()),
          (this.onEnterBounds = new t.Signal()),
          (this.onInputOver = null),
          (this.onInputOut = null),
          (this.onInputDown = null),
          (this.onInputUp = null),
          (this.onDragStart = null),
          (this.onDragStop = null),
          (this.onAnimationStart = null),
          (this.onAnimationComplete = null),
          (this.onAnimationLoop = null);
      }),
      (t.Events.prototype = {
        destroy: function () {
          (this.parent = null),
            this.onAddedToGroup.dispose(),
            this.onRemovedFromGroup.dispose(),
            this.onKilled.dispose(),
            this.onRevived.dispose(),
            this.onOutOfBounds.dispose(),
            this.onInputOver &&
              (this.onInputOver.dispose(),
              this.onInputOut.dispose(),
              this.onInputDown.dispose(),
              this.onInputUp.dispose(),
              this.onDragStart.dispose(),
              this.onDragStop.dispose()),
            this.onAnimationStart &&
              (this.onAnimationStart.dispose(),
              this.onAnimationComplete.dispose(),
              this.onAnimationLoop.dispose());
        },
      }),
      (t.Events.prototype.constructor = t.Events),
      (t.GameObjectFactory = function (e) {
        (this.game = e), (this.world = this.game.world);
      }),
      (t.GameObjectFactory.prototype = {
        existing: function (e) {
          return this.world.add(e);
        },
        image: function (e, n, r, i, s) {
          return (
            "undefined" == typeof s && (s = this.world),
            s.add(new t.Image(this.game, e, n, r, i))
          );
        },
        sprite: function (e, t, n, r, i) {
          return (
            "undefined" == typeof i && (i = this.world), i.create(e, t, n, r)
          );
        },
        tween: function (e) {
          return this.game.tweens.create(e);
        },
        group: function (e, n, r, i, s) {
          return new t.Group(this.game, e, n, r, i, s);
        },
        physicsGroup: function (e, n, r, i) {
          return new t.Group(this.game, n, r, i, !0, e);
        },
        spriteBatch: function (e, n, r) {
          return (
            "undefined" == typeof n && (n = "group"),
            "undefined" == typeof r && (r = !1),
            new t.SpriteBatch(this.game, e, n, r)
          );
        },
        audio: function (e, t, n, r) {
          return this.game.sound.add(e, t, n, r);
        },
        sound: function (e, t, n, r) {
          return this.game.sound.add(e, t, n, r);
        },
        tileSprite: function (e, n, r, i, s, o, u) {
          return (
            "undefined" == typeof u && (u = this.world),
            u.add(new t.TileSprite(this.game, e, n, r, i, s, o))
          );
        },
        text: function (e, n, r, i, s) {
          return (
            "undefined" == typeof s && (s = this.world),
            s.add(new t.Text(this.game, e, n, r, i))
          );
        },
        button: function (e, n, r, i, s, o, u, a, f, l) {
          return (
            "undefined" == typeof l && (l = this.world),
            l.add(new t.Button(this.game, e, n, r, i, s, o, u, a, f))
          );
        },
        graphics: function (e, n, r) {
          return (
            "undefined" == typeof r && (r = this.world),
            r.add(new t.Graphics(this.game, e, n))
          );
        },
        emitter: function (e, n, r) {
          return this.game.particles.add(
            new t.Particles.Arcade.Emitter(this.game, e, n, r)
          );
        },
        retroFont: function (e, n, r, i, s, o, u, a, f) {
          return new t.RetroFont(this.game, e, n, r, i, s, o, u, a, f);
        },
        bitmapText: function (e, n, r, i, s, o) {
          return (
            "undefined" == typeof o && (o = this.world),
            o.add(new t.BitmapText(this.game, e, n, r, i, s))
          );
        },
        tilemap: function (e, n, r, i, s) {
          return new t.Tilemap(this.game, e, n, r, i, s);
        },
        renderTexture: function (e, n, r, i) {
          ("undefined" == typeof r || "" === r) && (r = this.game.rnd.uuid()),
            "undefined" == typeof i && (i = !1);
          var s = new t.RenderTexture(this.game, e, n, r);
          return i && this.game.cache.addRenderTexture(r, s), s;
        },
        bitmapData: function (e, n, r, i) {
          "undefined" == typeof i && (i = !1),
            ("undefined" == typeof r || "" === r) && (r = this.game.rnd.uuid());
          var s = new t.BitmapData(this.game, r, e, n);
          return i && this.game.cache.addBitmapData(r, s), s;
        },
        filter: function (e) {
          var n = Array.prototype.splice.call(arguments, 1),
            e = new t.Filter[e](this.game);
          return e.init.apply(e, n), e;
        },
      }),
      (t.GameObjectFactory.prototype.constructor = t.GameObjectFactory),
      (t.GameObjectCreator = function (e) {
        (this.game = e), (this.world = this.game.world);
      }),
      (t.GameObjectCreator.prototype = {
        image: function (e, n, r, i) {
          return new t.Image(this.game, e, n, r, i);
        },
        sprite: function (e, n, r, i) {
          return new t.Sprite(this.game, e, n, r, i);
        },
        tween: function (e) {
          return new t.Tween(e, this.game);
        },
        group: function (e, n, r, i, s) {
          return new t.Group(this.game, null, n, r, i, s);
        },
        spriteBatch: function (e, n, r) {
          return (
            "undefined" == typeof n && (n = "group"),
            "undefined" == typeof r && (r = !1),
            new t.SpriteBatch(this.game, e, n, r)
          );
        },
        audio: function (e, t, n, r) {
          return this.game.sound.add(e, t, n, r);
        },
        sound: function (e, t, n, r) {
          return this.game.sound.add(e, t, n, r);
        },
        tileSprite: function (e, n, r, i, s, o) {
          return new t.TileSprite(this.game, e, n, r, i, s, o);
        },
        text: function (e, n, r, i) {
          return new t.Text(this.game, e, n, r, i);
        },
        button: function (e, n, r, i, s, o, u, a, f) {
          return new t.Button(this.game, e, n, r, i, s, o, u, a, f);
        },
        graphics: function (e, n) {
          return new t.Graphics(this.game, e, n);
        },
        emitter: function (e, n, r) {
          return new t.Particles.Arcade.Emitter(this.game, e, n, r);
        },
        retroFont: function (e, n, r, i, s, o, u, a, f) {
          return new t.RetroFont(this.game, e, n, r, i, s, o, u, a, f);
        },
        bitmapText: function (e, n, r, i, s) {
          return new t.BitmapText(this.game, e, n, r, i, s);
        },
        tilemap: function (e, n, r, i, s) {
          return new t.Tilemap(this.game, e, n, r, i, s);
        },
        renderTexture: function (e, n, r, i) {
          ("undefined" == typeof r || "" === r) && (r = this.game.rnd.uuid()),
            "undefined" == typeof i && (i = !1);
          var s = new t.RenderTexture(this.game, e, n, r);
          return i && this.game.cache.addRenderTexture(r, s), s;
        },
        bitmapData: function (e, n, r, i) {
          "undefined" == typeof i && (i = !1),
            ("undefined" == typeof r || "" === r) && (r = this.game.rnd.uuid());
          var s = new t.BitmapData(this.game, r, e, n);
          return i && this.game.cache.addBitmapData(r, s), s;
        },
        filter: function (e) {
          var n = Array.prototype.splice.call(arguments, 1),
            e = new t.Filter[e](this.game);
          return e.init.apply(e, n), e;
        },
      }),
      (t.GameObjectCreator.prototype.constructor = t.GameObjectCreator),
      (t.BitmapData = function (e, n, r, i) {
        "undefined" == typeof r && (r = 100),
          "undefined" == typeof i && (i = 100),
          (this.game = e),
          (this.key = n),
          (this.width = r),
          (this.height = i),
          (this.canvas = t.Canvas.create(r, i, "", !0)),
          (this.context = this.canvas.getContext("2d")),
          (this.ctx = this.context),
          (this.imageData = this.context.getImageData(0, 0, r, i)),
          (this.pixels = this.imageData.data.buffer
            ? this.imageData.data.buffer
            : this.imageData.data),
          (this.baseTexture = new PIXI.BaseTexture(this.canvas)),
          (this.texture = new PIXI.Texture(this.baseTexture)),
          (this.textureFrame = new t.Frame(
            0,
            0,
            0,
            r,
            i,
            "bitmapData",
            e.rnd.uuid()
          )),
          (this.type = t.BITMAPDATA),
          (this.dirty = !1);
      }),
      (t.BitmapData.prototype = {
        add: function (e) {
          if (Array.isArray(e))
            for (var t = 0; t < e.length; t++)
              e[t].loadTexture && e[t].loadTexture(this);
          else e.loadTexture(this);
        },
        clear: function () {
          this.context.clearRect(0, 0, this.width, this.height),
            (this.dirty = !0);
        },
        resize: function (e, t) {
          (e !== this.width || t !== this.height) &&
            ((this.width = e),
            (this.height = t),
            (this.canvas.width = e),
            (this.canvas.height = t),
            (this.textureFrame.width = e),
            (this.textureFrame.height = t),
            (this.imageData = this.context.getImageData(0, 0, e, t))),
            (this.dirty = !0);
        },
        refreshBuffer: function () {
          (this.imageData = this.context.getImageData(
            0,
            0,
            this.width,
            this.height
          )),
            (this.pixels = new Int32Array(this.imageData.data.buffer));
        },
        setPixel32: function (e, t, n, r, i, s) {
          e >= 0 &&
            e <= this.width &&
            t >= 0 &&
            t <= this.height &&
            ((this.pixels[t * this.width + e] =
              (s << 24) | (i << 16) | (r << 8) | n),
            this.context.putImageData(this.imageData, 0, 0),
            (this.dirty = !0));
        },
        setPixel: function (e, t, n, r, i) {
          this.setPixel32(e, t, n, r, i, 255);
        },
        getPixel: function (e, t) {
          return e >= 0 && e <= this.width && t >= 0 && t <= this.height
            ? this.data32[t * this.width + e]
            : void 0;
        },
        getPixel32: function (e, t) {
          return e >= 0 && e <= this.width && t >= 0 && t <= this.height
            ? this.data32[t * this.width + e]
            : void 0;
        },
        getPixels: function (e) {
          return this.context.getImageData(e.x, e.y, e.width, e.height);
        },
        copyPixels: function (e, t, n, r) {
          "string" == typeof e && (e = this.game.cache.getImage(e)),
            e &&
              this.context.drawImage(
                e,
                t.x,
                t.y,
                t.width,
                t.height,
                n,
                r,
                t.width,
                t.height
              );
        },
        draw: function (e, t, n) {
          "string" == typeof e && (e = this.game.cache.getImage(e)),
            e &&
              this.context.drawImage(
                e,
                0,
                0,
                e.width,
                e.height,
                t,
                n,
                e.width,
                e.height
              );
        },
        alphaMask: function (e, t) {
          var n = this.context.globalCompositeOperation;
          "string" == typeof t && (t = this.game.cache.getImage(t)),
            t && this.context.drawImage(t, 0, 0),
            (this.context.globalCompositeOperation = "source-atop"),
            "string" == typeof e && (e = this.game.cache.getImage(e)),
            e && this.context.drawImage(e, 0, 0),
            (this.context.globalCompositeOperation = n);
        },
        render: function () {
          this.game.renderType === t.WEBGL &&
            this.dirty &&
            (PIXI.updateWebGLTexture(this.baseTexture, this.game.renderer.gl),
            (this.dirty = !1));
        },
      }),
      (t.BitmapData.prototype.constructor = t.BitmapData),
      (t.Sprite = function (e, n, r, i, s) {
        (n = n || 0),
          (r = r || 0),
          (i = i || null),
          (s = s || null),
          (this.game = e),
          (this.name = ""),
          (this.type = t.SPRITE),
          (this.z = 0),
          (this.events = new t.Events(this)),
          (this.animations = new t.AnimationManager(this)),
          (this.key = i),
          (this._frame = 0),
          (this._frameName = ""),
          PIXI.Sprite.call(this, PIXI.TextureCache.__default),
          this.loadTexture(i, s),
          this.position.set(n, r),
          (this.world = new t.Point(n, r)),
          (this.autoCull = !1),
          (this.input = null),
          (this.body = null),
          (this.health = 1),
          (this.lifespan = 0),
          (this.checkWorldBounds = !1),
          (this.outOfBoundsKill = !1),
          (this.debug = !1),
          (this.cameraOffset = new t.Point()),
          (this._cache = [0, 0, 0, 0, 1, 0, 1, 0]),
          (this._bounds = new t.Rectangle());
      }),
      (t.Sprite.prototype = Object.create(PIXI.Sprite.prototype)),
      (t.Sprite.prototype.constructor = t.Sprite),
      (t.Sprite.prototype.preUpdate = function () {
        if (1 === this._cache[4] && this.exists)
          return (
            this.world.setTo(
              this.parent.position.x + this.position.x,
              this.parent.position.y + this.position.y
            ),
            (this.worldTransform.tx = this.world.x),
            (this.worldTransform.ty = this.world.y),
            (this._cache[0] = this.world.x),
            (this._cache[1] = this.world.y),
            (this._cache[2] = this.rotation),
            this.body && this.body.preUpdate(),
            (this._cache[4] = 0),
            !1
          );
        if (
          ((this._cache[0] = this.world.x),
          (this._cache[1] = this.world.y),
          (this._cache[2] = this.rotation),
          !this.exists || !this.parent.exists)
        )
          return (this._cache[3] = -1), !1;
        if (
          this.lifespan > 0 &&
          ((this.lifespan -= this.game.time.elapsed), this.lifespan <= 0)
        )
          return this.kill(), !1;
        if (
          ((this.autoCull || this.checkWorldBounds) &&
            this._bounds.copyFrom(this.getBounds()),
          this.autoCull &&
            (this.renderable = this.game.world.camera.screenView.intersects(
              this._bounds
            )),
          this.checkWorldBounds)
        )
          if (
            1 === this._cache[5] &&
            this.game.world.bounds.intersects(this._bounds)
          )
            (this._cache[5] = 0), this.events.onEnterBounds.dispatch(this);
          else if (
            0 === this._cache[5] &&
            !this.game.world.bounds.intersects(this._bounds) &&
            ((this._cache[5] = 1),
            this.events.onOutOfBounds.dispatch(this),
            this.outOfBoundsKill)
          )
            return this.kill(), !1;
        this.world.setTo(
          this.game.camera.x + this.worldTransform.tx,
          this.game.camera.y + this.worldTransform.ty
        ),
          this.visible &&
            (this._cache[3] = this.game.stage.currentRenderOrderID++),
          this.animations.update(),
          this.body && this.body.preUpdate();
        for (var e = 0, t = this.children.length; t > e; e++)
          this.children[e].preUpdate();
        return !0;
      }),
      (t.Sprite.prototype.update = function () {}),
      (t.Sprite.prototype.postUpdate = function () {
        this.key instanceof t.BitmapData && this.key.render(),
          this.exists && this.body && this.body.postUpdate(),
          1 === this._cache[7] &&
            ((this.position.x =
              (this.game.camera.view.x + this.cameraOffset.x) /
              this.game.camera.scale.x),
            (this.position.y =
              (this.game.camera.view.y + this.cameraOffset.y) /
              this.game.camera.scale.y));
        for (var e = 0, n = this.children.length; n > e; e++)
          this.children[e].postUpdate();
      }),
      (t.Sprite.prototype.loadTexture = function (e, n) {
        return (
          (n = n || 0),
          e instanceof t.RenderTexture
            ? ((this.key = e.key), void this.setTexture(e))
            : e instanceof t.BitmapData
            ? ((this.key = e), void this.setTexture(e.texture))
            : e instanceof PIXI.Texture
            ? ((this.key = e), void this.setTexture(e))
            : null === e || "undefined" == typeof e
            ? ((this.key = "__default"),
              void this.setTexture(PIXI.TextureCache[this.key]))
            : "string" != typeof e || this.game.cache.checkImageKey(e)
            ? this.game.cache.isSpriteSheet(e)
              ? ((this.key = e),
                this.animations.loadFrameData(this.game.cache.getFrameData(e)),
                "string" == typeof n ? (this.frameName = n) : (this.frame = n),
                void 0)
              : ((this.key = e), void this.setTexture(PIXI.TextureCache[e]))
            : ((this.key = "__missing"),
              void this.setTexture(PIXI.TextureCache[this.key]))
        );
      }),
      (t.Sprite.prototype.crop = function (e) {
        if ("undefined" == typeof e || null === e)
          this.texture.hasOwnProperty("sourceWidth") &&
            this.texture.setFrame(
              new t.Rectangle(
                0,
                0,
                this.texture.sourceWidth,
                this.texture.sourceHeight
              )
            );
        else if (this.texture instanceof PIXI.Texture) {
          var n = {};
          t.Utils.extend(!0, n, this.texture),
            (n.sourceWidth = n.width),
            (n.sourceHeight = n.height),
            (n.frame = e),
            (n.width = e.width),
            (n.height = e.height),
            (this.texture = n),
            (this.texture.updateFrame = !0),
            PIXI.Texture.frameUpdates.push(this.texture);
        } else this.texture.setFrame(e);
      }),
      (t.Sprite.prototype.revive = function (e) {
        return (
          "undefined" == typeof e && (e = 1),
          (this.alive = !0),
          (this.exists = !0),
          (this.visible = !0),
          (this.health = e),
          this.events && this.events.onRevived.dispatch(this),
          this
        );
      }),
      (t.Sprite.prototype.kill = function () {
        return (
          (this.alive = !1),
          (this.exists = !1),
          (this.visible = !1),
          this.events && this.events.onKilled.dispatch(this),
          this
        );
      }),
      (t.Sprite.prototype.destroy = function (e) {
        if (null !== this.game) {
          "undefined" == typeof e && (e = !0),
            this.parent &&
              (this.parent instanceof t.Group
                ? this.parent.remove(this)
                : this.parent.removeChild(this)),
            this.input && this.input.destroy(),
            this.animations && this.animations.destroy(),
            this.body && this.body.destroy(),
            this.events && this.events.destroy();
          var n = this.children.length;
          if (e) for (; n--; ) this.children[n].destroy(e);
          else for (; n--; ) this.removeChild(this.children[n]);
          (this.alive = !1),
            (this.exists = !1),
            (this.visible = !1),
            (this.filters = null),
            (this.mask = null),
            (this.game = null);
        }
      }),
      (t.Sprite.prototype.damage = function (e) {
        return (
          this.alive && ((this.health -= e), this.health <= 0 && this.kill()),
          this
        );
      }),
      (t.Sprite.prototype.reset = function (e, t, n) {
        return (
          "undefined" == typeof n && (n = 1),
          this.world.setTo(e, t),
          (this.position.x = e),
          (this.position.y = t),
          (this.alive = !0),
          (this.exists = !0),
          (this.visible = !0),
          (this.renderable = !0),
          (this._outOfBoundsFired = !1),
          (this.health = n),
          this.body && this.body.reset(e, t, !1, !1),
          (this._cache[4] = 1),
          this
        );
      }),
      (t.Sprite.prototype.bringToTop = function () {
        return this.parent && this.parent.bringToTop(this), this;
      }),
      (t.Sprite.prototype.play = function (e, t, n, r) {
        return this.animations ? this.animations.play(e, t, n, r) : void 0;
      }),
      (t.Sprite.prototype.overlap = function (e) {
        return t.Rectangle.intersects(this.getBounds(), e.getBounds());
      }),
      Object.defineProperty(t.Sprite.prototype, "angle", {
        get: function () {
          return t.Math.wrapAngle(t.Math.radToDeg(this.rotation));
        },
        set: function (e) {
          this.rotation = t.Math.degToRad(t.Math.wrapAngle(e));
        },
      }),
      Object.defineProperty(t.Sprite.prototype, "deltaX", {
        get: function () {
          return this.world.x - this._cache[0];
        },
      }),
      Object.defineProperty(t.Sprite.prototype, "deltaY", {
        get: function () {
          return this.world.y - this._cache[1];
        },
      }),
      Object.defineProperty(t.Sprite.prototype, "deltaZ", {
        get: function () {
          return this.rotation - this._cache[2];
        },
      }),
      Object.defineProperty(t.Sprite.prototype, "inWorld", {
        get: function () {
          return this.game.world.bounds.intersects(this.getBounds());
        },
      }),
      Object.defineProperty(t.Sprite.prototype, "inCamera", {
        get: function () {
          return this.game.world.camera.screenView.intersects(this.getBounds());
        },
      }),
      Object.defineProperty(t.Sprite.prototype, "frame", {
        get: function () {
          return this.animations.frame;
        },
        set: function (e) {
          this.animations.frame = e;
        },
      }),
      Object.defineProperty(t.Sprite.prototype, "frameName", {
        get: function () {
          return this.animations.frameName;
        },
        set: function (e) {
          this.animations.frameName = e;
        },
      }),
      Object.defineProperty(t.Sprite.prototype, "renderOrderID", {
        get: function () {
          return this._cache[3];
        },
      }),
      Object.defineProperty(t.Sprite.prototype, "inputEnabled", {
        get: function () {
          return this.input && this.input.enabled;
        },
        set: function (e) {
          e
            ? null === this.input &&
              ((this.input = new t.InputHandler(this)), this.input.start())
            : this.input && this.input.enabled && this.input.stop();
        },
      }),
      Object.defineProperty(t.Sprite.prototype, "exists", {
        get: function () {
          return !!this._cache[6];
        },
        set: function (e) {
          e
            ? ((this._cache[6] = 1),
              this.body &&
                this.body.type === t.Physics.P2JS &&
                this.body.addToWorld(),
              (this.visible = !0))
            : ((this._cache[6] = 0),
              this.body &&
                this.body.type === t.Physics.P2JS &&
                this.body.removeFromWorld(),
              (this.visible = !1));
        },
      }),
      Object.defineProperty(t.Sprite.prototype, "fixedToCamera", {
        get: function () {
          return !!this._cache[7];
        },
        set: function (e) {
          e
            ? ((this._cache[7] = 1), this.cameraOffset.set(this.x, this.y))
            : (this._cache[7] = 0);
        },
      }),
      Object.defineProperty(t.Sprite.prototype, "smoothed", {
        get: function () {
          return !this.texture.baseTexture.scaleMode;
        },
        set: function (e) {
          e
            ? this.texture && (this.texture.baseTexture.scaleMode = 0)
            : this.texture && (this.texture.baseTexture.scaleMode = 1);
        },
      }),
      Object.defineProperty(t.Sprite.prototype, "x", {
        get: function () {
          return this.position.x;
        },
        set: function (e) {
          (this.position.x = e),
            this.body &&
              this.body.type === t.Physics.ARCADE &&
              2 === this.body.phase &&
              (this.body._reset = 1);
        },
      }),
      Object.defineProperty(t.Sprite.prototype, "y", {
        get: function () {
          return this.position.y;
        },
        set: function (e) {
          (this.position.y = e),
            this.body &&
              this.body.type === t.Physics.ARCADE &&
              2 === this.body.phase &&
              (this.body._reset = 1);
        },
      }),
      (t.Image = function (e, n, r, i, s) {
        (n = n || 0),
          (r = r || 0),
          (i = i || null),
          (s = s || null),
          (this.game = e),
          (this.exists = !0),
          (this.name = ""),
          (this.type = t.IMAGE),
          (this.z = 0),
          (this.events = new t.Events(this)),
          (this.key = i),
          (this._frame = 0),
          (this._frameName = ""),
          PIXI.Sprite.call(this, PIXI.TextureCache.__default),
          this.loadTexture(i, s),
          this.position.set(n, r),
          (this.world = new t.Point(n, r)),
          (this.autoCull = !1),
          (this.input = null),
          (this.cameraOffset = new t.Point()),
          (this._cache = [0, 0, 0, 0, 1, 0, 1, 0]);
      }),
      (t.Image.prototype = Object.create(PIXI.Sprite.prototype)),
      (t.Image.prototype.constructor = t.Image),
      (t.Image.prototype.preUpdate = function () {
        if (
          ((this._cache[0] = this.world.x),
          (this._cache[1] = this.world.y),
          (this._cache[2] = this.rotation),
          !this.exists || !this.parent.exists)
        )
          return (this._cache[3] = -1), !1;
        this.autoCull &&
          (this.renderable = this.game.world.camera.screenView.intersects(
            this.getBounds()
          )),
          this.world.setTo(
            this.game.camera.x + this.worldTransform[2],
            this.game.camera.y + this.worldTransform[5]
          ),
          this.visible &&
            (this._cache[3] = this.game.stage.currentRenderOrderID++);
        for (var e = 0, t = this.children.length; t > e; e++)
          this.children[e].preUpdate();
        return !0;
      }),
      (t.Image.prototype.update = function () {}),
      (t.Image.prototype.postUpdate = function () {
        this.key instanceof t.BitmapData && this.key.render(),
          1 === this._cache[7] &&
            ((this.position.x =
              (this.game.camera.view.x + this.cameraOffset.x) /
              this.game.camera.scale.x),
            (this.position.y =
              (this.game.camera.view.y + this.cameraOffset.y) /
              this.game.camera.scale.y));
        for (var e = 0, n = this.children.length; n > e; e++)
          this.children[e].postUpdate();
      }),
      (t.Image.prototype.loadTexture = function (e, n) {
        if (((n = n || 0), e instanceof t.RenderTexture))
          return (this.key = e.key), void this.setTexture(e);
        if (e instanceof t.BitmapData)
          return (this.key = e), void this.setTexture(e.texture);
        if (e instanceof PIXI.Texture)
          return (this.key = e), void this.setTexture(e);
        if (null === e || "undefined" == typeof e)
          return (
            (this.key = "__default"),
            void this.setTexture(PIXI.TextureCache[this.key])
          );
        if ("string" == typeof e && !this.game.cache.checkImageKey(e))
          return (
            (this.key = "__missing"),
            void this.setTexture(PIXI.TextureCache[this.key])
          );
        if (this.game.cache.isSpriteSheet(e)) {
          this.key = e;
          var r = this.game.cache.getFrameData(e);
          return "string" == typeof n
            ? ((this._frame = 0),
              (this._frameName = n),
              void this.setTexture(PIXI.TextureCache[r.getFrameByName(n).uuid]))
            : ((this._frame = n),
              (this._frameName = ""),
              void this.setTexture(PIXI.TextureCache[r.getFrame(n).uuid]));
        }
        return (this.key = e), void this.setTexture(PIXI.TextureCache[e]);
      }),
      (t.Image.prototype.crop = function (e) {
        if ("undefined" == typeof e || null === e)
          this.texture.hasOwnProperty("sourceWidth") &&
            this.texture.setFrame(
              new t.Rectangle(
                0,
                0,
                this.texture.sourceWidth,
                this.texture.sourceHeight
              )
            );
        else if (this.texture instanceof PIXI.Texture) {
          var n = {};
          t.Utils.extend(!0, n, this.texture),
            (n.sourceWidth = n.width),
            (n.sourceHeight = n.height),
            (n.frame = e),
            (n.width = e.width),
            (n.height = e.height),
            (this.texture = n),
            (this.texture.updateFrame = !0),
            PIXI.Texture.frameUpdates.push(this.texture);
        } else this.texture.setFrame(e);
      }),
      (t.Image.prototype.revive = function () {
        return (
          (this.alive = !0),
          (this.exists = !0),
          (this.visible = !0),
          this.events && this.events.onRevived.dispatch(this),
          this
        );
      }),
      (t.Image.prototype.kill = function () {
        return (
          (this.alive = !1),
          (this.exists = !1),
          (this.visible = !1),
          this.events && this.events.onKilled.dispatch(this),
          this
        );
      }),
      (t.Image.prototype.destroy = function (e) {
        if (null !== this.game) {
          "undefined" == typeof e && (e = !0),
            this.parent &&
              (this.parent instanceof t.Group
                ? this.parent.remove(this)
                : this.parent.removeChild(this)),
            this.events && this.events.destroy(),
            this.input && this.input.destroy();
          var n = this.children.length;
          if (e) for (; n--; ) this.children[n].destroy(e);
          else for (; n--; ) this.removeChild(this.children[n]);
          (this.alive = !1),
            (this.exists = !1),
            (this.visible = !1),
            (this.filters = null),
            (this.mask = null),
            (this.game = null);
        }
      }),
      (t.Image.prototype.reset = function (e, t) {
        return (
          this.world.setTo(e, t),
          (this.position.x = e),
          (this.position.y = t),
          (this.alive = !0),
          (this.exists = !0),
          (this.visible = !0),
          (this.renderable = !0),
          this
        );
      }),
      (t.Image.prototype.bringToTop = function () {
        return this.parent && this.parent.bringToTop(this), this;
      }),
      Object.defineProperty(t.Image.prototype, "angle", {
        get: function () {
          return t.Math.wrapAngle(t.Math.radToDeg(this.rotation));
        },
        set: function (e) {
          this.rotation = t.Math.degToRad(t.Math.wrapAngle(e));
        },
      }),
      Object.defineProperty(t.Image.prototype, "deltaX", {
        get: function () {
          return this.world.x - this._cache[0];
        },
      }),
      Object.defineProperty(t.Image.prototype, "deltaY", {
        get: function () {
          return this.world.y - this._cache[1];
        },
      }),
      Object.defineProperty(t.Image.prototype, "deltaZ", {
        get: function () {
          return this.rotation - this._cache[2];
        },
      }),
      Object.defineProperty(t.Image.prototype, "inWorld", {
        get: function () {
          return this.game.world.bounds.intersects(this.getBounds());
        },
      }),
      Object.defineProperty(t.Image.prototype, "inCamera", {
        get: function () {
          return this.game.world.camera.screenView.intersects(this.getBounds());
        },
      }),
      Object.defineProperty(t.Image.prototype, "frame", {
        get: function () {
          return this._frame;
        },
        set: function (e) {
          if (e !== this.frame && this.game.cache.isSpriteSheet(this.key)) {
            var t = this.game.cache.getFrameData(this.key);
            t &&
              e < t.total &&
              t.getFrame(e) &&
              (this.setTexture(PIXI.TextureCache[t.getFrame(e).uuid]),
              (this._frame = e));
          }
        },
      }),
      Object.defineProperty(t.Image.prototype, "frameName", {
        get: function () {
          return this._frameName;
        },
        set: function (e) {
          if (e !== this.frameName && this.game.cache.isSpriteSheet(this.key)) {
            var t = this.game.cache.getFrameData(this.key);
            t &&
              t.getFrameByName(e) &&
              (this.setTexture(PIXI.TextureCache[t.getFrameByName(e).uuid]),
              (this._frameName = e));
          }
        },
      }),
      Object.defineProperty(t.Image.prototype, "renderOrderID", {
        get: function () {
          return this._cache[3];
        },
      }),
      Object.defineProperty(t.Image.prototype, "inputEnabled", {
        get: function () {
          return this.input && this.input.enabled;
        },
        set: function (e) {
          e
            ? null === this.input &&
              ((this.input = new t.InputHandler(this)), this.input.start())
            : this.input && this.input.enabled && this.input.stop();
        },
      }),
      Object.defineProperty(t.Image.prototype, "fixedToCamera", {
        get: function () {
          return !!this._cache[7];
        },
        set: function (e) {
          e
            ? ((this._cache[7] = 1), this.cameraOffset.set(this.x, this.y))
            : (this._cache[7] = 0);
        },
      }),
      Object.defineProperty(t.Image.prototype, "smoothed", {
        get: function () {
          return !this.texture.baseTexture.scaleMode;
        },
        set: function (e) {
          e
            ? this.texture && (this.texture.baseTexture.scaleMode = 0)
            : this.texture && (this.texture.baseTexture.scaleMode = 1);
        },
      }),
      (t.TileSprite = function (e, n, r, i, s, o, u) {
        (n = n || 0),
          (r = r || 0),
          (i = i || 256),
          (s = s || 256),
          (o = o || null),
          (u = u || null),
          (this.game = e),
          (this.name = ""),
          (this.type = t.TILESPRITE),
          (this.z = 0),
          (this.events = new t.Events(this)),
          (this.animations = new t.AnimationManager(this)),
          (this.key = o),
          (this._frame = 0),
          (this._frameName = ""),
          (this._scroll = new t.Point()),
          PIXI.TilingSprite.call(this, PIXI.TextureCache.__default, i, s),
          this.loadTexture(o, u),
          this.position.set(n, r),
          (this.input = null),
          (this.world = new t.Point(n, r)),
          (this.autoCull = !1),
          (this.checkWorldBounds = !1),
          (this.cameraOffset = new t.Point()),
          (this.body = null),
          (this._cache = [0, 0, 0, 0, 1, 0, 1, 0]);
      }),
      (t.TileSprite.prototype = Object.create(PIXI.TilingSprite.prototype)),
      (t.TileSprite.prototype.constructor = t.TileSprite),
      (t.TileSprite.prototype.preUpdate = function () {
        if (1 === this._cache[4] && this.exists)
          return (
            this.world.setTo(
              this.parent.position.x + this.position.x,
              this.parent.position.y + this.position.y
            ),
            (this.worldTransform.tx = this.world.x),
            (this.worldTransform.ty = this.world.y),
            (this._cache[0] = this.world.x),
            (this._cache[1] = this.world.y),
            (this._cache[2] = this.rotation),
            this.body && this.body.preUpdate(),
            (this._cache[4] = 0),
            !1
          );
        if (
          ((this._cache[0] = this.world.x),
          (this._cache[1] = this.world.y),
          (this._cache[2] = this.rotation),
          !this.exists || !this.parent.exists)
        )
          return (this._cache[3] = -1), !1;
        (this.autoCull || this.checkWorldBounds) &&
          this._bounds.copyFrom(this.getBounds()),
          this.autoCull &&
            (this.renderable = this.game.world.camera.screenView.intersects(
              this._bounds
            )),
          this.checkWorldBounds &&
            (1 === this._cache[5] &&
            this.game.world.bounds.intersects(this._bounds)
              ? ((this._cache[5] = 0), this.events.onEnterBounds.dispatch(this))
              : 0 !== this._cache[5] ||
                this.game.world.bounds.intersects(this._bounds) ||
                ((this._cache[5] = 1),
                this.events.onOutOfBounds.dispatch(this))),
          this.world.setTo(
            this.game.camera.x + this.worldTransform.tx,
            this.game.camera.y + this.worldTransform.ty
          ),
          this.visible &&
            (this._cache[3] = this.game.stage.currentRenderOrderID++),
          this.animations.update(),
          0 !== this._scroll.x &&
            (this.tilePosition.x +=
              this._scroll.x * this.game.time.physicsElapsed),
          0 !== this._scroll.y &&
            (this.tilePosition.y +=
              this._scroll.y * this.game.time.physicsElapsed),
          this.body && this.body.preUpdate();
        for (var e = 0, t = this.children.length; t > e; e++)
          this.children[e].preUpdate();
        return !0;
      }),
      (t.TileSprite.prototype.update = function () {}),
      (t.TileSprite.prototype.postUpdate = function () {
        this.exists && this.body && this.body.postUpdate(),
          1 === this._cache[7] &&
            ((this.position.x = this.game.camera.view.x + this.cameraOffset.x),
            (this.position.y = this.game.camera.view.y + this.cameraOffset.y));
        for (var e = 0, t = this.children.length; t > e; e++)
          this.children[e].postUpdate();
      }),
      (t.TileSprite.prototype.autoScroll = function (e, t) {
        this._scroll.set(e, t);
      }),
      (t.TileSprite.prototype.stopScroll = function () {
        this._scroll.set(0, 0);
      }),
      (t.TileSprite.prototype.loadTexture = function (e, n) {
        return (
          (n = n || 0),
          e instanceof t.RenderTexture
            ? ((this.key = e.key), void this.setTexture(e))
            : e instanceof t.BitmapData
            ? ((this.key = e), void this.setTexture(e.texture))
            : e instanceof PIXI.Texture
            ? ((this.key = e), void this.setTexture(e))
            : null === e || "undefined" == typeof e
            ? ((this.key = "__default"),
              void this.setTexture(PIXI.TextureCache[this.key]))
            : "string" != typeof e || this.game.cache.checkImageKey(e)
            ? this.game.cache.isSpriteSheet(e)
              ? ((this.key = e),
                this.animations.loadFrameData(this.game.cache.getFrameData(e)),
                "string" == typeof n ? (this.frameName = n) : (this.frame = n),
                void 0)
              : ((this.key = e), void this.setTexture(PIXI.TextureCache[e]))
            : ((this.key = "__missing"),
              void this.setTexture(PIXI.TextureCache[this.key]))
        );
      }),
      (t.TileSprite.prototype.destroy = function (e) {
        if (null !== this.game) {
          "undefined" == typeof e && (e = !0),
            this.filters && (this.filters = null),
            this.parent &&
              (this.parent instanceof t.Group
                ? this.parent.remove(this)
                : this.parent.removeChild(this)),
            this.animations.destroy(),
            this.events.destroy();
          var n = this.children.length;
          if (e) for (; n--; ) this.children[n].destroy(e);
          else for (; n--; ) this.removeChild(this.children[n]);
          (this.exists = !1),
            (this.visible = !1),
            (this.filters = null),
            (this.mask = null),
            (this.game = null);
        }
      }),
      (t.TileSprite.prototype.play = function (e, t, n, r) {
        return this.animations.play(e, t, n, r);
      }),
      (t.TileSprite.prototype.reset = function (e, t) {
        return (
          this.world.setTo(e, t),
          (this.position.x = e),
          (this.position.y = t),
          (this.alive = !0),
          (this.exists = !0),
          (this.visible = !0),
          (this.renderable = !0),
          (this._outOfBoundsFired = !1),
          (this.tilePosition.x = 0),
          (this.tilePosition.y = 0),
          this.body && this.body.reset(e, t, !1, !1),
          (this._cache[4] = 1),
          this
        );
      }),
      Object.defineProperty(t.TileSprite.prototype, "angle", {
        get: function () {
          return t.Math.wrapAngle(t.Math.radToDeg(this.rotation));
        },
        set: function (e) {
          this.rotation = t.Math.degToRad(t.Math.wrapAngle(e));
        },
      }),
      Object.defineProperty(t.TileSprite.prototype, "frame", {
        get: function () {
          return this.animations.frame;
        },
        set: function (e) {
          e !== this.animations.frame && (this.animations.frame = e);
        },
      }),
      Object.defineProperty(t.TileSprite.prototype, "frameName", {
        get: function () {
          return this.animations.frameName;
        },
        set: function (e) {
          e !== this.animations.frameName && (this.animations.frameName = e);
        },
      }),
      Object.defineProperty(t.TileSprite.prototype, "fixedToCamera", {
        get: function () {
          return !!this._cache[7];
        },
        set: function (e) {
          e
            ? ((this._cache[7] = 1), this.cameraOffset.set(this.x, this.y))
            : (this._cache[7] = 0);
        },
      }),
      Object.defineProperty(t.TileSprite.prototype, "exists", {
        get: function () {
          return !!this._cache[6];
        },
        set: function (e) {
          e
            ? ((this._cache[6] = 1),
              this.body &&
                this.body.type === t.Physics.P2JS &&
                this.body.addToWorld(),
              (this.visible = !0))
            : ((this._cache[6] = 0),
              this.body &&
                this.body.type === t.Physics.P2JS &&
                (this.body.safeRemove = !0),
              (this.visible = !1));
        },
      }),
      Object.defineProperty(t.TileSprite.prototype, "inputEnabled", {
        get: function () {
          return this.input && this.input.enabled;
        },
        set: function (e) {
          e
            ? null === this.input &&
              ((this.input = new t.InputHandler(this)), this.input.start())
            : this.input && this.input.enabled && this.input.stop();
        },
      }),
      Object.defineProperty(t.TileSprite.prototype, "x", {
        get: function () {
          return this.position.x;
        },
        set: function (e) {
          (this.position.x = e),
            this.body &&
              this.body.type === t.Physics.ARCADE &&
              2 === this.body.phase &&
              (this.body._reset = 1);
        },
      }),
      Object.defineProperty(t.TileSprite.prototype, "y", {
        get: function () {
          return this.position.y;
        },
        set: function (e) {
          (this.position.y = e),
            this.body &&
              this.body.type === t.Physics.ARCADE &&
              2 === this.body.phase &&
              (this.body._reset = 1);
        },
      }),
      (t.Text = function (e, n, r, i, s) {
        (n = n || 0),
          (r = r || 0),
          (i = i || " "),
          (s = s || {}),
          (i = 0 === i.length ? " " : i.toString()),
          (this.game = e),
          (this.exists = !0),
          (this.name = ""),
          (this.type = t.TEXT),
          (this.z = 0),
          (this.world = new t.Point(n, r)),
          (this._text = i),
          (this._font = ""),
          (this._fontSize = 32),
          (this._fontWeight = "normal"),
          (this._lineSpacing = 0),
          (this.events = new t.Events(this)),
          (this.input = null),
          (this.cameraOffset = new t.Point()),
          this.setStyle(s),
          PIXI.Text.call(this, i, this.style),
          this.position.set(n, r),
          (this._cache = [0, 0, 0, 0, 1, 0, 1, 0]);
      }),
      (t.Text.prototype = Object.create(PIXI.Text.prototype)),
      (t.Text.prototype.constructor = t.Text),
      (t.Text.prototype.preUpdate = function () {
        if (
          ((this._cache[0] = this.world.x),
          (this._cache[1] = this.world.y),
          (this._cache[2] = this.rotation),
          !this.exists || !this.parent.exists)
        )
          return (this.renderOrderID = -1), !1;
        this.autoCull &&
          (this.renderable = this.game.world.camera.screenView.intersects(
            this.getBounds()
          )),
          this.world.setTo(
            this.game.camera.x + this.worldTransform[2],
            this.game.camera.y + this.worldTransform[5]
          ),
          this.visible &&
            (this._cache[3] = this.game.stage.currentRenderOrderID++);
        for (var e = 0, t = this.children.length; t > e; e++)
          this.children[e].preUpdate();
        return !0;
      }),
      (t.Text.prototype.update = function () {}),
      (t.Text.prototype.postUpdate = function () {
        1 === this._cache[7] &&
          ((this.position.x =
            (this.game.camera.view.x + this.cameraOffset.x) /
            this.game.camera.scale.x),
          (this.position.y =
            (this.game.camera.view.y + this.cameraOffset.y) /
            this.game.camera.scale.y));
        for (var e = 0, t = this.children.length; t > e; e++)
          this.children[e].postUpdate();
      }),
      (t.Text.prototype.destroy = function (e) {
        if (null !== this.game) {
          "undefined" == typeof e && (e = !0),
            this.parent &&
              (this.parent instanceof t.Group
                ? this.parent.remove(this)
                : this.parent.removeChild(this)),
            this.texture.destroy(),
            this.canvas.parentNode
              ? this.canvas.parentNode.removeChild(this.canvas)
              : ((this.canvas = null), (this.context = null));
          var n = this.children.length;
          if (e) for (; n--; ) this.children[n].destroy(e);
          else for (; n--; ) this.removeChild(this.children[n]);
          (this.exists = !1),
            (this.visible = !1),
            (this.filters = null),
            (this.mask = null),
            (this.game = null);
        }
      }),
      (t.Text.prototype.setShadow = function (e, t, n, r) {
        (this.style.shadowOffsetX = e || 0),
          (this.style.shadowOffsetY = t || 0),
          (this.style.shadowColor = n || "rgba(0,0,0,0)"),
          (this.style.shadowBlur = r || 0),
          (this.dirty = !0);
      }),
      (t.Text.prototype.setStyle = function (e) {
        (e = e || {}),
          (e.font = e.font || "bold 20pt Arial"),
          (e.fill = e.fill || "black"),
          (e.align = e.align || "left"),
          (e.stroke = e.stroke || "black"),
          (e.strokeThickness = e.strokeThickness || 0),
          (e.wordWrap = e.wordWrap || !1),
          (e.wordWrapWidth = e.wordWrapWidth || 100),
          (e.shadowOffsetX = e.shadowOffsetX || 0),
          (e.shadowOffsetY = e.shadowOffsetY || 0),
          (e.shadowColor = e.shadowColor || "rgba(0,0,0,0)"),
          (e.shadowBlur = e.shadowBlur || 0),
          (this.style = e),
          (this.dirty = !0);
      }),
      (t.Text.prototype.updateText = function () {
        this.context.font = this.style.font;
        var e = this.text;
        this.style.wordWrap && (e = this.runWordWrap(this.text));
        for (
          var t = e.split(/(?:\r\n|\r|\n)/), n = [], r = 0, i = 0;
          i < t.length;
          i++
        ) {
          var s = this.context.measureText(t[i]).width;
          (n[i] = s), (r = Math.max(r, s));
        }
        this.canvas.width = r + this.style.strokeThickness;
        var o =
          this.determineFontHeight("font: " + this.style.font + ";") +
          this.style.strokeThickness +
          this._lineSpacing +
          this.style.shadowOffsetY;
        for (
          this.canvas.height = o * t.length,
            navigator.isCocoonJS &&
              this.context.clearRect(
                0,
                0,
                this.canvas.width,
                this.canvas.height
              ),
            this.context.fillStyle = this.style.fill,
            this.context.font = this.style.font,
            this.context.strokeStyle = this.style.stroke,
            this.context.lineWidth = this.style.strokeThickness,
            this.context.shadowOffsetX = this.style.shadowOffsetX,
            this.context.shadowOffsetY = this.style.shadowOffsetY,
            this.context.shadowColor = this.style.shadowColor,
            this.context.shadowBlur = this.style.shadowBlur,
            this.context.textBaseline = "top",
            i = 0;
          i < t.length;
          i++
        ) {
          var u = new PIXI.Point(
            this.style.strokeThickness / 2,
            this.style.strokeThickness / 2 + i * o
          );
          "right" === this.style.align
            ? (u.x += r - n[i])
            : "center" === this.style.align && (u.x += (r - n[i]) / 2),
            (u.y += this._lineSpacing),
            this.style.stroke &&
              this.style.strokeThickness &&
              this.context.strokeText(t[i], u.x, u.y),
            this.style.fill && this.context.fillText(t[i], u.x, u.y);
        }
        this.updateTexture();
      }),
      (t.Text.prototype.runWordWrap = function (e) {
        for (var t = "", n = e.split("\n"), r = 0; r < n.length; r++) {
          for (
            var i = this.style.wordWrapWidth, s = n[r].split(" "), o = 0;
            o < s.length;
            o++
          ) {
            var u = this.context.measureText(s[o]).width,
              a = u + this.context.measureText(" ").width;
            a > i
              ? (o > 0 && (t += "\n"),
                (t += s[o] + " "),
                (i = this.style.wordWrapWidth - u))
              : ((i -= a), (t += s[o] + " "));
          }
          r < n.length - 1 && (t += "\n");
        }
        return t;
      }),
      Object.defineProperty(t.Text.prototype, "angle", {
        get: function () {
          return t.Math.radToDeg(this.rotation);
        },
        set: function (e) {
          this.rotation = t.Math.degToRad(e);
        },
      }),
      Object.defineProperty(t.Text.prototype, "text", {
        get: function () {
          return this._text;
        },
        set: function (e) {
          e !== this._text &&
            ((this._text = e.toString() || " "),
            (this.dirty = !0),
            this.updateTransform());
        },
      }),
      Object.defineProperty(t.Text.prototype, "font", {
        get: function () {
          return this._font;
        },
        set: function (e) {
          e !== this._font &&
            ((this._font = e.trim()),
            (this.style.font =
              this._fontWeight +
              " " +
              this._fontSize +
              "px '" +
              this._font +
              "'"),
            (this.dirty = !0),
            this.updateTransform());
        },
      }),
      Object.defineProperty(t.Text.prototype, "fontSize", {
        get: function () {
          return this._fontSize;
        },
        set: function (e) {
          (e = parseInt(e, 10)),
            e !== this._fontSize &&
              ((this._fontSize = e),
              (this.style.font =
                this._fontWeight +
                " " +
                this._fontSize +
                "px '" +
                this._font +
                "'"),
              (this.dirty = !0),
              this.updateTransform());
        },
      }),
      Object.defineProperty(t.Text.prototype, "fontWeight", {
        get: function () {
          return this._fontWeight;
        },
        set: function (e) {
          e !== this._fontWeight &&
            ((this._fontWeight = e),
            (this.style.font =
              this._fontWeight +
              " " +
              this._fontSize +
              "px '" +
              this._font +
              "'"),
            (this.dirty = !0),
            this.updateTransform());
        },
      }),
      Object.defineProperty(t.Text.prototype, "fill", {
        get: function () {
          return this.style.fill;
        },
        set: function (e) {
          e !== this.style.fill && ((this.style.fill = e), (this.dirty = !0));
        },
      }),
      Object.defineProperty(t.Text.prototype, "align", {
        get: function () {
          return this.style.align;
        },
        set: function (e) {
          e !== this.style.align && ((this.style.align = e), (this.dirty = !0));
        },
      }),
      Object.defineProperty(t.Text.prototype, "stroke", {
        get: function () {
          return this.style.stroke;
        },
        set: function (e) {
          e !== this.style.stroke &&
            ((this.style.stroke = e), (this.dirty = !0));
        },
      }),
      Object.defineProperty(t.Text.prototype, "strokeThickness", {
        get: function () {
          return this.style.strokeThickness;
        },
        set: function (e) {
          e !== this.style.strokeThickness &&
            ((this.style.strokeThickness = e), (this.dirty = !0));
        },
      }),
      Object.defineProperty(t.Text.prototype, "wordWrap", {
        get: function () {
          return this.style.wordWrap;
        },
        set: function (e) {
          e !== this.style.wordWrap &&
            ((this.style.wordWrap = e), (this.dirty = !0));
        },
      }),
      Object.defineProperty(t.Text.prototype, "wordWrapWidth", {
        get: function () {
          return this.style.wordWrapWidth;
        },
        set: function (e) {
          e !== this.style.wordWrapWidth &&
            ((this.style.wordWrapWidth = e), (this.dirty = !0));
        },
      }),
      Object.defineProperty(t.Text.prototype, "lineSpacing", {
        get: function () {
          return this._lineSpacing;
        },
        set: function (e) {
          e !== this._lineSpacing &&
            ((this._lineSpacing = parseFloat(e)),
            (this.dirty = !0),
            this.updateTransform());
        },
      }),
      Object.defineProperty(t.Text.prototype, "shadowOffsetX", {
        get: function () {
          return this.style.shadowOffsetX;
        },
        set: function (e) {
          e !== this.style.shadowOffsetX &&
            ((this.style.shadowOffsetX = e), (this.dirty = !0));
        },
      }),
      Object.defineProperty(t.Text.prototype, "shadowOffsetY", {
        get: function () {
          return this.style.shadowOffsetY;
        },
        set: function (e) {
          e !== this.style.shadowOffsetY &&
            ((this.style.shadowOffsetY = e), (this.dirty = !0));
        },
      }),
      Object.defineProperty(t.Text.prototype, "shadowColor", {
        get: function () {
          return this.style.shadowColor;
        },
        set: function (e) {
          e !== this.style.shadowColor &&
            ((this.style.shadowColor = e), (this.dirty = !0));
        },
      }),
      Object.defineProperty(t.Text.prototype, "shadowBlur", {
        get: function () {
          return this.style.shadowBlur;
        },
        set: function (e) {
          e !== this.style.shadowBlur &&
            ((this.style.shadowBlur = e), (this.dirty = !0));
        },
      }),
      Object.defineProperty(t.Text.prototype, "inputEnabled", {
        get: function () {
          return this.input && this.input.enabled;
        },
        set: function (e) {
          e
            ? null === this.input &&
              ((this.input = new t.InputHandler(this)), this.input.start())
            : this.input && this.input.enabled && this.input.stop();
        },
      }),
      Object.defineProperty(t.Text.prototype, "fixedToCamera", {
        get: function () {
          return !!this._cache[7];
        },
        set: function (e) {
          e
            ? ((this._cache[7] = 1), this.cameraOffset.set(this.x, this.y))
            : (this._cache[7] = 0);
        },
      }),
      (t.BitmapText = function (e, n, r, i, s, o) {
        (n = n || 0),
          (r = r || 0),
          (i = i || ""),
          (s = s || ""),
          (o = o || 32),
          (this.game = e),
          (this.exists = !0),
          (this.name = ""),
          (this.type = t.BITMAPTEXT),
          (this.z = 0),
          (this.world = new t.Point(n, r)),
          (this._text = s),
          (this._font = i),
          (this._fontSize = o),
          (this._align = "left"),
          (this._tint = 16777215),
          (this.events = new t.Events(this)),
          (this.input = null),
          (this.cameraOffset = new t.Point()),
          PIXI.BitmapText.call(this, s),
          this.position.set(n, r),
          (this._cache = [0, 0, 0, 0, 1, 0, 1, 0]);
      }),
      (t.BitmapText.prototype = Object.create(PIXI.BitmapText.prototype)),
      (t.BitmapText.prototype.constructor = t.BitmapText),
      (t.BitmapText.prototype.setStyle = function () {
        (this.style = { align: this._align }),
          (this.fontName = this._font),
          (this.fontSize = this._fontSize),
          (this.dirty = !0);
      }),
      (t.BitmapText.prototype.preUpdate = function () {
        return (
          (this._cache[0] = this.world.x),
          (this._cache[1] = this.world.y),
          (this._cache[2] = this.rotation),
          this.exists && this.parent.exists
            ? (this.autoCull &&
                (this.renderable = this.game.world.camera.screenView.intersects(
                  this.getBounds()
                )),
              this.world.setTo(
                this.game.camera.x + this.worldTransform[2],
                this.game.camera.y + this.worldTransform[5]
              ),
              this.visible &&
                (this._cache[3] = this.game.stage.currentRenderOrderID++),
              !0)
            : ((this.renderOrderID = -1), !1)
        );
      }),
      (t.BitmapText.prototype.update = function () {}),
      (t.BitmapText.prototype.postUpdate = function () {
        1 === this._cache[7] &&
          ((this.position.x =
            (this.game.camera.view.x + this.cameraOffset.x) /
            this.game.camera.scale.x),
          (this.position.y =
            (this.game.camera.view.y + this.cameraOffset.y) /
            this.game.camera.scale.y));
      }),
      (t.BitmapText.prototype.destroy = function (e) {
        if (null !== this.game) {
          "undefined" == typeof e && (e = !0),
            this.parent &&
              (this.parent instanceof t.Group
                ? this.parent.remove(this)
                : this.parent.removeChild(this));
          var n = this.children.length;
          if (e)
            for (; n--; )
              this.children[n].destroy
                ? this.children[n].destroy(e)
                : this.removeChild(this.children[n]);
          else for (; n--; ) this.removeChild(this.children[n]);
          (this.exists = !1),
            (this.visible = !1),
            (this.filters = null),
            (this.mask = null),
            (this.game = null);
        }
      }),
      Object.defineProperty(t.BitmapText.prototype, "align", {
        get: function () {
          return this._align;
        },
        set: function (e) {
          e !== this._align && ((this._align = e), this.setStyle());
        },
      }),
      Object.defineProperty(t.BitmapText.prototype, "tint", {
        get: function () {
          return this._tint;
        },
        set: function (e) {
          e !== this._tint && ((this._tint = e), (this.dirty = !0));
        },
      }),
      Object.defineProperty(t.BitmapText.prototype, "angle", {
        get: function () {
          return t.Math.radToDeg(this.rotation);
        },
        set: function (e) {
          this.rotation = t.Math.degToRad(e);
        },
      }),
      Object.defineProperty(t.BitmapText.prototype, "font", {
        get: function () {
          return this._font;
        },
        set: function (e) {
          e !== this._font &&
            ((this._font = e.trim()),
            (this.style.font = this._fontSize + "px '" + this._font + "'"),
            (this.dirty = !0));
        },
      }),
      Object.defineProperty(t.BitmapText.prototype, "fontSize", {
        get: function () {
          return this._fontSize;
        },
        set: function (e) {
          (e = parseInt(e, 10)),
            e !== this._fontSize &&
              ((this._fontSize = e),
              (this.style.font = this._fontSize + "px '" + this._font + "'"),
              (this.dirty = !0));
        },
      }),
      Object.defineProperty(t.BitmapText.prototype, "text", {
        get: function () {
          return this._text;
        },
        set: function (e) {
          e !== this._text &&
            ((this._text = e.toString() || " "), (this.dirty = !0));
        },
      }),
      Object.defineProperty(t.BitmapText.prototype, "inputEnabled", {
        get: function () {
          return this.input && this.input.enabled;
        },
        set: function (e) {
          e
            ? null === this.input &&
              ((this.input = new t.InputHandler(this)), this.input.start())
            : this.input && this.input.enabled && this.input.stop();
        },
      }),
      Object.defineProperty(t.BitmapText.prototype, "fixedToCamera", {
        get: function () {
          return !!this._cache[7];
        },
        set: function (e) {
          e
            ? ((this._cache[7] = 1), this.cameraOffset.set(this.x, this.y))
            : (this._cache[7] = 0);
        },
      }),
      (t.Button = function (e, n, r, i, s, o, u, a, f, l) {
        (n = n || 0),
          (r = r || 0),
          (i = i || null),
          (s = s || null),
          (o = o || this),
          t.Image.call(this, e, n, r, i, a),
          (this.type = t.BUTTON),
          (this._onOverFrameName = null),
          (this._onOutFrameName = null),
          (this._onDownFrameName = null),
          (this._onUpFrameName = null),
          (this._onOverFrameID = null),
          (this._onOutFrameID = null),
          (this._onDownFrameID = null),
          (this._onUpFrameID = null),
          (this.onOverSound = null),
          (this.onOutSound = null),
          (this.onDownSound = null),
          (this.onUpSound = null),
          (this.onOverSoundMarker = ""),
          (this.onOutSoundMarker = ""),
          (this.onDownSoundMarker = ""),
          (this.onUpSoundMarker = ""),
          (this.onInputOver = new t.Signal()),
          (this.onInputOut = new t.Signal()),
          (this.onInputDown = new t.Signal()),
          (this.onInputUp = new t.Signal()),
          (this.freezeFrames = !1),
          (this.forceOut = !1),
          (this.inputEnabled = !0),
          this.input.start(0, !0),
          this.setFrames(u, a, f, l),
          null !== s && this.onInputUp.add(s, o),
          this.events.onInputOver.add(this.onInputOverHandler, this),
          this.events.onInputOut.add(this.onInputOutHandler, this),
          this.events.onInputDown.add(this.onInputDownHandler, this),
          this.events.onInputUp.add(this.onInputUpHandler, this);
      }),
      (t.Button.prototype = Object.create(t.Image.prototype)),
      (t.Button.prototype.constructor = t.Button),
      (t.Button.prototype.clearFrames = function () {
        (this._onOverFrameName = null),
          (this._onOverFrameID = null),
          (this._onOutFrameName = null),
          (this._onOutFrameID = null),
          (this._onDownFrameName = null),
          (this._onDownFrameID = null),
          (this._onUpFrameName = null),
          (this._onUpFrameID = null);
      }),
      (t.Button.prototype.setFrames = function (e, t, n, r) {
        this.clearFrames(),
          null !== e &&
            ("string" == typeof e
              ? ((this._onOverFrameName = e),
                this.input.pointerOver() && (this.frameName = e))
              : ((this._onOverFrameID = e),
                this.input.pointerOver() && (this.frame = e))),
          null !== t &&
            ("string" == typeof t
              ? ((this._onOutFrameName = t),
                this.input.pointerOver() === !1 && (this.frameName = t))
              : ((this._onOutFrameID = t),
                this.input.pointerOver() === !1 && (this.frame = t))),
          null !== n &&
            ("string" == typeof n
              ? ((this._onDownFrameName = n),
                this.input.pointerDown() && (this.frameName = n))
              : ((this._onDownFrameID = n),
                this.input.pointerDown() && (this.frame = n))),
          null !== r &&
            ("string" == typeof r
              ? ((this._onUpFrameName = r),
                this.input.pointerUp() && (this.frameName = r))
              : ((this._onUpFrameID = r),
                this.input.pointerUp() && (this.frame = r)));
      }),
      (t.Button.prototype.setSounds = function (e, t, n, r, i, s, o, u) {
        this.setOverSound(e, t),
          this.setOutSound(i, s),
          this.setDownSound(n, r),
          this.setUpSound(o, u);
      }),
      (t.Button.prototype.setOverSound = function (e, n) {
        (this.onOverSound = null),
          (this.onOverSoundMarker = ""),
          e instanceof t.Sound && (this.onOverSound = e),
          "string" == typeof n && (this.onOverSoundMarker = n);
      }),
      (t.Button.prototype.setOutSound = function (e, n) {
        (this.onOutSound = null),
          (this.onOutSoundMarker = ""),
          e instanceof t.Sound && (this.onOutSound = e),
          "string" == typeof n && (this.onOutSoundMarker = n);
      }),
      (t.Button.prototype.setDownSound = function (e, n) {
        (this.onDownSound = null),
          (this.onDownSoundMarker = ""),
          e instanceof t.Sound && (this.onDownSound = e),
          "string" == typeof n && (this.onDownSoundMarker = n);
      }),
      (t.Button.prototype.setUpSound = function (e, n) {
        (this.onUpSound = null),
          (this.onUpSoundMarker = ""),
          e instanceof t.Sound && (this.onUpSound = e),
          "string" == typeof n && (this.onUpSoundMarker = n);
      }),
      (t.Button.prototype.onInputOverHandler = function (e, t) {
        this.freezeFrames === !1 && this.setState(1),
          this.onOverSound && this.onOverSound.play(this.onOverSoundMarker),
          this.onInputOver && this.onInputOver.dispatch(this, t);
      }),
      (t.Button.prototype.onInputOutHandler = function (e, t) {
        this.freezeFrames === !1 && this.setState(2),
          this.onOutSound && this.onOutSound.play(this.onOutSoundMarker),
          this.onInputOut && this.onInputOut.dispatch(this, t);
      }),
      (t.Button.prototype.onInputDownHandler = function (e, t) {
        this.freezeFrames === !1 && this.setState(3),
          this.onDownSound && this.onDownSound.play(this.onDownSoundMarker),
          this.onInputDown && this.onInputDown.dispatch(this, t);
      }),
      (t.Button.prototype.onInputUpHandler = function (e, t, n) {
        this.onUpSound && this.onUpSound.play(this.onUpSoundMarker),
          this.onInputUp && this.onInputUp.dispatch(this, t, n),
          this.freezeFrames ||
            this.setState(
              this.forceOut
                ? 2
                : null !== this._onUpFrameName || null !== this._onUpFrameID
                ? 4
                : n
                ? 1
                : 2
            );
      }),
      (t.Button.prototype.setState = function (e) {
        1 === e
          ? null != this._onOverFrameName
            ? (this.frameName = this._onOverFrameName)
            : null != this._onOverFrameID && (this.frame = this._onOverFrameID)
          : 2 === e
          ? null != this._onOutFrameName
            ? (this.frameName = this._onOutFrameName)
            : null != this._onOutFrameID && (this.frame = this._onOutFrameID)
          : 3 === e
          ? null != this._onDownFrameName
            ? (this.frameName = this._onDownFrameName)
            : null != this._onDownFrameID && (this.frame = this._onDownFrameID)
          : 4 === e &&
            (null != this._onUpFrameName
              ? (this.frameName = this._onUpFrameName)
              : null != this._onUpFrameID && (this.frame = this._onUpFrameID));
      }),
      (t.Graphics = function (e, n, r) {
        (n = n || 0),
          (r = r || 0),
          (this.game = e),
          (this.exists = !0),
          (this.name = ""),
          (this.type = t.GRAPHICS),
          (this.z = 0),
          (this.world = new t.Point(n, r)),
          (this.cameraOffset = new t.Point()),
          PIXI.Graphics.call(this),
          this.position.set(n, r),
          (this._cache = [0, 0, 0, 0, 1, 0, 1, 0]);
      }),
      (t.Graphics.prototype = Object.create(PIXI.Graphics.prototype)),
      (t.Graphics.prototype.constructor = t.Graphics),
      (t.Graphics.prototype.preUpdate = function () {
        return (
          (this._cache[0] = this.world.x),
          (this._cache[1] = this.world.y),
          (this._cache[2] = this.rotation),
          this.exists && this.parent.exists
            ? (this.autoCull &&
                (this.renderable = this.game.world.camera.screenView.intersects(
                  this.getBounds()
                )),
              this.world.setTo(
                this.game.camera.x + this.worldTransform[2],
                this.game.camera.y + this.worldTransform[5]
              ),
              this.visible &&
                (this._cache[3] = this.game.stage.currentRenderOrderID++),
              !0)
            : ((this.renderOrderID = -1), !1)
        );
      }),
      (t.Graphics.prototype.update = function () {}),
      (t.Graphics.prototype.postUpdate = function () {
        1 === this._cache[7] &&
          ((this.position.x =
            (this.game.camera.view.x + this.cameraOffset.x) /
            this.game.camera.scale.x),
          (this.position.y =
            (this.game.camera.view.y + this.cameraOffset.y) /
            this.game.camera.scale.y));
      }),
      (t.Graphics.prototype.destroy = function (e) {
        "undefined" == typeof e && (e = !0),
          this.clear(),
          this.parent &&
            (this.parent instanceof t.Group
              ? this.parent.remove(this)
              : this.parent.removeChild(this));
        var n = this.children.length;
        if (e) for (; n--; ) this.children[n].destroy(e);
        else for (; n--; ) this.removeChild(this.children[n]);
        (this.exists = !1), (this.visible = !1), (this.game = null);
      }),
      (t.Graphics.prototype.drawPolygon = function (e) {
        this.moveTo(e.points[0].x, e.points[0].y);
        for (var t = 1; t < e.points.length; t += 1)
          this.lineTo(e.points[t].x, e.points[t].y);
        this.lineTo(e.points[0].x, e.points[0].y);
      }),
      Object.defineProperty(t.Graphics.prototype, "angle", {
        get: function () {
          return t.Math.radToDeg(this.rotation);
        },
        set: function (e) {
          this.rotation = t.Math.degToRad(e);
        },
      }),
      Object.defineProperty(t.Graphics.prototype, "fixedToCamera", {
        get: function () {
          return !!this._cache[7];
        },
        set: function (e) {
          e
            ? ((this._cache[7] = 1), this.cameraOffset.set(this.x, this.y))
            : (this._cache[7] = 0);
        },
      }),
      (t.RenderTexture = function (e, n, r, i) {
        (this.game = e),
          (this.key = i),
          (this.type = t.RENDERTEXTURE),
          (this._temp = new t.Point()),
          PIXI.RenderTexture.call(this, n, r);
      }),
      (t.RenderTexture.prototype = Object.create(PIXI.RenderTexture.prototype)),
      (t.RenderTexture.prototype.constructor = t.RenderTexture),
      (t.RenderTexture.prototype.renderXY = function (e, t, n, r) {
        this._temp.set(t, n), this.render(e, this._temp, r);
      }),
      (t.SpriteBatch = function (e, n, r, i) {
        PIXI.SpriteBatch.call(this),
          t.Group.call(this, e, n, r, i),
          (this.type = t.SPRITEBATCH);
      }),
      (t.SpriteBatch.prototype = t.Utils.extend(
        !0,
        t.SpriteBatch.prototype,
        t.Group.prototype,
        PIXI.SpriteBatch.prototype
      )),
      (t.SpriteBatch.prototype.constructor = t.SpriteBatch),
      (t.RetroFont = function (e, n, r, i, s, o, u, a, f, l) {
        (this.characterWidth = r),
          (this.characterHeight = i),
          (this.characterSpacingX = u || 0),
          (this.characterSpacingY = a || 0),
          (this.characterPerRow = o),
          (this.offsetX = f || 0),
          (this.offsetY = l || 0),
          (this.align = "left"),
          (this.multiLine = !1),
          (this.autoUpperCase = !0),
          (this.customSpacingX = 0),
          (this.customSpacingY = 0),
          (this.fixedWidth = 0),
          (this.fontSet = e.cache.getImage(n)),
          (this._text = ""),
          (this.grabData = []);
        for (
          var c = this.offsetX,
            h = this.offsetY,
            p = 0,
            d = new t.FrameData(),
            v = 0;
          v < s.length;
          v++
        ) {
          var m = e.rnd.uuid(),
            g = d.addFrame(
              new t.Frame(
                v,
                c,
                h,
                this.characterWidth,
                this.characterHeight,
                "",
                m
              )
            );
          (this.grabData[s.charCodeAt(v)] = g.index),
            (PIXI.TextureCache[m] = new PIXI.Texture(PIXI.BaseTextureCache[n], {
              x: c,
              y: h,
              width: this.characterWidth,
              height: this.characterHeight,
            })),
            p++,
            p == this.characterPerRow
              ? ((p = 0),
                (c = this.offsetX),
                (h += this.characterHeight + this.characterSpacingY))
              : (c += this.characterWidth + this.characterSpacingX);
        }
        e.cache.updateFrameData(n, d),
          (this.stamp = new t.Image(e, 0, 0, n, 0)),
          t.RenderTexture.call(this, e),
          (this.type = t.RETROFONT);
      }),
      (t.RetroFont.prototype = Object.create(t.RenderTexture.prototype)),
      (t.RetroFont.prototype.constructor = t.RetroFont),
      (t.RetroFont.ALIGN_LEFT = "left"),
      (t.RetroFont.ALIGN_RIGHT = "right"),
      (t.RetroFont.ALIGN_CENTER = "center"),
      (t.RetroFont.TEXT_SET1 =
        " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~"),
      (t.RetroFont.TEXT_SET2 =
        " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ"),
      (t.RetroFont.TEXT_SET3 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 "),
      (t.RetroFont.TEXT_SET4 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789"),
      (t.RetroFont.TEXT_SET5 =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ.,/() '!?-*:0123456789"),
      (t.RetroFont.TEXT_SET6 =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ!?:;0123456789\"(),-.' "),
      (t.RetroFont.TEXT_SET7 =
        "AGMSY+:4BHNTZ!;5CIOU.?06DJPV,(17EKQW\")28FLRX-'39"),
      (t.RetroFont.TEXT_SET8 = "0123456789 .ABCDEFGHIJKLMNOPQRSTUVWXYZ"),
      (t.RetroFont.TEXT_SET9 =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ()-0123456789.:,'\"?!"),
      (t.RetroFont.TEXT_SET10 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"),
      (t.RetroFont.TEXT_SET11 =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ.,\"-+!?()':;0123456789"),
      (t.RetroFont.prototype.setFixedWidth = function (e, t) {
        "undefined" == typeof t && (t = "left"),
          (this.fixedWidth = e),
          (this.align = t);
      }),
      (t.RetroFont.prototype.setText = function (e, t, n, r, i, s) {
        (this.multiLine = t || !1),
          (this.customSpacingX = n || 0),
          (this.customSpacingY = r || 0),
          (this.align = i || "left"),
          (this.autoUpperCase = s ? !1 : !0),
          e.length > 0 && (this.text = e);
      }),
      (t.RetroFont.prototype.resize = function (e, t) {
        if (
          ((this.width = e),
          (this.height = t),
          (this.frame.width = this.width),
          (this.frame.height = this.height),
          (this.baseTexture.width = this.width),
          (this.baseTexture.height = this.height),
          this.renderer.type === PIXI.WEBGL_RENDERER)
        ) {
          (this.projection.x = this.width / 2),
            (this.projection.y = -this.height / 2);
          var n = this.renderer.gl;
          n.bindTexture(n.TEXTURE_2D, this.baseTexture._glTextures[n.id]),
            n.texImage2D(
              n.TEXTURE_2D,
              0,
              n.RGBA,
              this.width,
              this.height,
              0,
              n.RGBA,
              n.UNSIGNED_BYTE,
              null
            );
        } else this.textureBuffer.resize(this.width, this.height);
        PIXI.Texture.frameUpdates.push(this);
      }),
      (t.RetroFont.prototype.buildRetroFontText = function () {
        var e = 0,
          n = 0;
        if (this.multiLine) {
          var r = this._text.split("\n");
          this.fixedWidth > 0
            ? this.resize(
                this.fixedWidth,
                r.length * (this.characterHeight + this.customSpacingY) -
                  this.customSpacingY
              )
            : this.resize(
                this.getLongestLine() *
                  (this.characterWidth + this.customSpacingX),
                r.length * (this.characterHeight + this.customSpacingY) -
                  this.customSpacingY
              ),
            this.textureBuffer.clear();
          for (var i = 0; i < r.length; i++) {
            switch (this.align) {
              case t.RetroFont.ALIGN_LEFT:
                e = 0;
                break;
              case t.RetroFont.ALIGN_RIGHT:
                e =
                  this.width -
                  r[i].length * (this.characterWidth + this.customSpacingX);
                break;
              case t.RetroFont.ALIGN_CENTER:
                (e =
                  this.width / 2 -
                  (r[i].length * (this.characterWidth + this.customSpacingX)) /
                    2),
                  (e += this.customSpacingX / 2);
            }
            0 > e && (e = 0),
              this.pasteLine(r[i], e, n, this.customSpacingX),
              (n += this.characterHeight + this.customSpacingY);
          }
        } else {
          switch (
            (this.fixedWidth > 0
              ? this.resize(this.fixedWidth, this.characterHeight)
              : this.resize(
                  this._text.length *
                    (this.characterWidth + this.customSpacingX),
                  this.characterHeight
                ),
            this.textureBuffer.clear(),
            this.align)
          ) {
            case t.RetroFont.ALIGN_LEFT:
              e = 0;
              break;
            case t.RetroFont.ALIGN_RIGHT:
              e =
                this.width -
                this._text.length * (this.characterWidth + this.customSpacingX);
              break;
            case t.RetroFont.ALIGN_CENTER:
              (e =
                this.width / 2 -
                (this._text.length *
                  (this.characterWidth + this.customSpacingX)) /
                  2),
                (e += this.customSpacingX / 2);
          }
          this.pasteLine(this._text, e, 0, this.customSpacingX);
        }
      }),
      (t.RetroFont.prototype.pasteLine = function (e, n, r, i) {
        for (var s = new t.Point(), o = 0; o < e.length; o++)
          if (" " == e.charAt(o)) n += this.characterWidth + i;
          else if (
            this.grabData[e.charCodeAt(o)] >= 0 &&
            ((this.stamp.frame = this.grabData[e.charCodeAt(o)]),
            s.set(n, r),
            this.render(this.stamp, s, !1),
            (n += this.characterWidth + i),
            n > this.width)
          )
            break;
      }),
      (t.RetroFont.prototype.getLongestLine = function () {
        var e = 0;
        if (this._text.length > 0)
          for (var t = this._text.split("\n"), n = 0; n < t.length; n++)
            t[n].length > e && (e = t[n].length);
        return e;
      }),
      (t.RetroFont.prototype.removeUnsupportedCharacters = function (e) {
        for (var t = "", n = 0; n < this._text.length; n++) {
          var r = this._text[n],
            i = r.charCodeAt(0);
          (this.grabData[i] >= 0 || (!e && "\n" === r)) && (t = t.concat(r));
        }
        return t;
      }),
      Object.defineProperty(t.RetroFont.prototype, "text", {
        get: function () {
          return this._text;
        },
        set: function (e) {
          var t;
          (t = this.autoUpperCase ? e.toUpperCase() : e),
            t !== this._text &&
              ((this._text = t),
              this.removeUnsupportedCharacters(this.multiLine),
              this.buildRetroFontText());
        },
      }),
      (t.Canvas = {
        create: function (e, t, n, r) {
          if (
            ("undefined" == typeof r && (r = !1),
            (e = e || 256),
            (t = t || 256),
            r)
          )
            var i = document.createElement("canvas");
          else
            var i = document.createElement(
              navigator.isCocoonJS ? "screencanvas" : "canvas"
            );
          return (
            "string" == typeof n && "" !== n && (i.id = n),
            (i.width = e),
            (i.height = t),
            (i.style.display = "block"),
            i
          );
        },
        getOffset: function (e, n) {
          n = n || new t.Point();
          var r = e.getBoundingClientRect(),
            i = e.clientTop || document.body.clientTop || 0,
            s = e.clientLeft || document.body.clientLeft || 0,
            o = 0,
            u = 0;
          return (
            "CSS1Compat" === document.compatMode
              ? ((o =
                  window.pageYOffset ||
                  document.documentElement.scrollTop ||
                  e.scrollTop ||
                  0),
                (u =
                  window.pageXOffset ||
                  document.documentElement.scrollLeft ||
                  e.scrollLeft ||
                  0))
              : ((o =
                  window.pageYOffset ||
                  document.body.scrollTop ||
                  e.scrollTop ||
                  0),
                (u =
                  window.pageXOffset ||
                  document.body.scrollLeft ||
                  e.scrollLeft ||
                  0)),
            (n.x = r.left + u - s),
            (n.y = r.top + o - i),
            n
          );
        },
        getAspectRatio: function (e) {
          return e.width / e.height;
        },
        setBackgroundColor: function (e, t) {
          return (t = t || "rgb(0,0,0)"), (e.style.backgroundColor = t), e;
        },
        setTouchAction: function (e, t) {
          return (
            (t = t || "none"),
            (e.style.msTouchAction = t),
            (e.style["ms-touch-action"] = t),
            (e.style["touch-action"] = t),
            e
          );
        },
        setUserSelect: function (e, t) {
          return (
            (t = t || "none"),
            (e.style["-webkit-touch-callout"] = t),
            (e.style["-webkit-user-select"] = t),
            (e.style["-khtml-user-select"] = t),
            (e.style["-moz-user-select"] = t),
            (e.style["-ms-user-select"] = t),
            (e.style["user-select"] = t),
            (e.style["-webkit-tap-highlight-color"] = "rgba(0, 0, 0, 0)"),
            e
          );
        },
        addToDOM: function (e, t, n) {
          var r;
          return (
            "undefined" == typeof n && (n = !0),
            t &&
              ("string" == typeof t
                ? (r = document.getElementById(t))
                : "object" == typeof t && 1 === t.nodeType && (r = t)),
            r || (r = document.body),
            n && r.style && (r.style.overflow = "hidden"),
            r.appendChild(e),
            e
          );
        },
        setTransform: function (e, t, n, r, i, s, o) {
          return e.setTransform(r, s, o, i, t, n), e;
        },
        setSmoothingEnabled: function (e, t) {
          return (
            (e.imageSmoothingEnabled = t),
            (e.mozImageSmoothingEnabled = t),
            (e.oImageSmoothingEnabled = t),
            (e.webkitImageSmoothingEnabled = t),
            (e.msImageSmoothingEnabled = t),
            e
          );
        },
        setImageRenderingCrisp: function (e) {
          return (
            (e.style["image-rendering"] = "optimizeSpeed"),
            (e.style["image-rendering"] = "crisp-edges"),
            (e.style["image-rendering"] = "-moz-crisp-edges"),
            (e.style["image-rendering"] = "-webkit-optimize-contrast"),
            (e.style["image-rendering"] = "optimize-contrast"),
            (e.style.msInterpolationMode = "nearest-neighbor"),
            e
          );
        },
        setImageRenderingBicubic: function (e) {
          return (
            (e.style["image-rendering"] = "auto"),
            (e.style.msInterpolationMode = "bicubic"),
            e
          );
        },
      }),
      (t.Device = function (e) {
        (this.game = e),
          (this.desktop = !1),
          (this.iOS = !1),
          (this.cocoonJS = !1),
          (this.ejecta = !1),
          (this.android = !1),
          (this.chromeOS = !1),
          (this.linux = !1),
          (this.macOS = !1),
          (this.windows = !1),
          (this.windowsPhone = !1),
          (this.canvas = !1),
          (this.file = !1),
          (this.fileSystem = !1),
          (this.localStorage = !1),
          (this.webGL = !1),
          (this.worker = !1),
          (this.touch = !1),
          (this.mspointer = !1),
          (this.css3D = !1),
          (this.pointerLock = !1),
          (this.typedArray = !1),
          (this.vibration = !1),
          (this.getUserMedia = !1),
          (this.quirksMode = !1),
          (this.arora = !1),
          (this.chrome = !1),
          (this.epiphany = !1),
          (this.firefox = !1),
          (this.ie = !1),
          (this.ieVersion = 0),
          (this.trident = !1),
          (this.tridentVersion = 0),
          (this.mobileSafari = !1),
          (this.midori = !1),
          (this.opera = !1),
          (this.safari = !1),
          (this.webApp = !1),
          (this.silk = !1),
          (this.audioData = !1),
          (this.webAudio = !1),
          (this.ogg = !1),
          (this.opus = !1),
          (this.mp3 = !1),
          (this.wav = !1),
          (this.m4a = !1),
          (this.webm = !1),
          (this.iPhone = !1),
          (this.iPhone4 = !1),
          (this.iPad = !1),
          (this.pixelRatio = 0),
          (this.littleEndian = !1),
          (this.fullscreen = !1),
          (this.requestFullscreen = ""),
          (this.cancelFullscreen = ""),
          (this.fullscreenKeyboard = !1),
          this._checkAudio(),
          this._checkBrowser(),
          this._checkCSS3D(),
          this._checkDevice(),
          this._checkFeatures(),
          this._checkOS();
      }),
      (t.Device.prototype = {
        _checkOS: function () {
          var e = navigator.userAgent;
          /Android/.test(e)
            ? (this.android = !0)
            : /CrOS/.test(e)
            ? (this.chromeOS = !0)
            : /iP[ao]d|iPhone/i.test(e)
            ? (this.iOS = !0)
            : /Linux/.test(e)
            ? (this.linux = !0)
            : /Mac OS/.test(e)
            ? (this.macOS = !0)
            : /Windows/.test(e) &&
              ((this.windows = !0),
              /Windows Phone/i.test(e) && (this.windowsPhone = !0)),
            (this.windows || this.macOS || (this.linux && this.silk === !1)) &&
              (this.desktop = !0),
            (this.windowsPhone ||
              (/Windows NT/i.test(e) && /Touch/i.test(e))) &&
              (this.desktop = !1);
        },
        _checkFeatures: function () {
          this.canvas = !!window.CanvasRenderingContext2D || this.cocoonJS;
          try {
            this.localStorage = !!localStorage.getItem;
          } catch (e) {
            this.localStorage = !1;
          }
          (this.file = !!(
            window.File &&
            window.FileReader &&
            window.FileList &&
            window.Blob
          )),
            (this.fileSystem = !!window.requestFileSystem),
            (this.webGL = (function () {
              try {
                var e = document.createElement("canvas");
                return (
                  !!window.WebGLRenderingContext &&
                  (e.getContext("webgl") || e.getContext("experimental-webgl"))
                );
              } catch (t) {
                return !1;
              }
            })()),
            (this.webGL = null === this.webGL || this.webGL === !1 ? !1 : !0),
            (this.worker = !!window.Worker),
            ("ontouchstart" in document.documentElement ||
              (window.navigator.maxTouchPoints &&
                window.navigator.maxTouchPoints > 1)) &&
              (this.touch = !0),
            (window.navigator.msPointerEnabled ||
              window.navigator.pointerEnabled) &&
              (this.mspointer = !0),
            (this.pointerLock =
              "pointerLockElement" in document ||
              "mozPointerLockElement" in document ||
              "webkitPointerLockElement" in document),
            (this.quirksMode = "CSS1Compat" === document.compatMode ? !1 : !0),
            (this.getUserMedia = !!(
              navigator.getUserMedia ||
              navigator.webkitGetUserMedia ||
              navigator.mozGetUserMedia ||
              navigator.msGetUserMedia
            ));
        },
        checkFullScreenSupport: function () {
          for (
            var e = [
                "requestFullscreen",
                "requestFullScreen",
                "webkitRequestFullscreen",
                "webkitRequestFullScreen",
                "msRequestFullscreen",
                "msRequestFullScreen",
                "mozRequestFullScreen",
                "mozRequestFullscreen",
              ],
              t = 0;
            t < e.length;
            t++
          )
            this.game.canvas[e[t]] &&
              ((this.fullscreen = !0), (this.requestFullscreen = e[t]));
          var n = [
            "cancelFullScreen",
            "exitFullscreen",
            "webkitCancelFullScreen",
            "webkitExitFullscreen",
            "msCancelFullScreen",
            "msExitFullscreen",
            "mozCancelFullScreen",
            "mozExitFullscreen",
          ];
          if (this.fullscreen)
            for (var t = 0; t < n.length; t++)
              this.game.canvas[n[t]] && (this.cancelFullscreen = n[t]);
          window.Element &&
            Element.ALLOW_KEYBOARD_INPUT &&
            (this.fullscreenKeyboard = !0);
        },
        _checkBrowser: function () {
          var e = navigator.userAgent;
          /Arora/.test(e)
            ? (this.arora = !0)
            : /Chrome/.test(e)
            ? (this.chrome = !0)
            : /Epiphany/.test(e)
            ? (this.epiphany = !0)
            : /Firefox/.test(e)
            ? (this.firefox = !0)
            : /Mobile Safari/.test(e)
            ? (this.mobileSafari = !0)
            : /MSIE (\d+\.\d+);/.test(e)
            ? ((this.ie = !0), (this.ieVersion = parseInt(RegExp.$1, 10)))
            : /Midori/.test(e)
            ? (this.midori = !0)
            : /Opera/.test(e)
            ? (this.opera = !0)
            : /Safari/.test(e)
            ? (this.safari = !0)
            : /Silk/.test(e)
            ? (this.silk = !0)
            : /Trident\/(\d+\.\d+)(.*)rv:(\d+\.\d+)/.test(e) &&
              ((this.ie = !0),
              (this.trident = !0),
              (this.tridentVersion = parseInt(RegExp.$1, 10)),
              (this.ieVersion = parseInt(RegExp.$3, 10))),
            navigator.standalone && (this.webApp = !0),
            navigator.isCocoonJS && (this.cocoonJS = !0),
            "undefined" != typeof window.ejecta && (this.ejecta = !0);
        },
        _checkAudio: function () {
          (this.audioData = !!window.Audio),
            (this.webAudio =
              !!window.webkitAudioContext || !!window.AudioContext);
          var e = document.createElement("audio"),
            t = !1;
          try {
            (t = !!e.canPlayType) &&
              (e
                .canPlayType('audio/ogg; codecs="vorbis"')
                .replace(/^no$/, "") && (this.ogg = !0),
              e.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, "") &&
                (this.opus = !0),
              e.canPlayType("audio/mpeg;").replace(/^no$/, "") &&
                (this.mp3 = !0),
              e.canPlayType('audio/wav; codecs="1"').replace(/^no$/, "") &&
                (this.wav = !0),
              (e.canPlayType("audio/x-m4a;") ||
                e.canPlayType("audio/aac;").replace(/^no$/, "")) &&
                (this.m4a = !0),
              e
                .canPlayType('audio/webm; codecs="vorbis"')
                .replace(/^no$/, "") && (this.webm = !0));
          } catch (n) {}
        },
        _checkDevice: function () {
          (this.pixelRatio = window.devicePixelRatio || 1),
            (this.iPhone =
              -1 != navigator.userAgent.toLowerCase().indexOf("iphone")),
            (this.iPhone4 = 2 == this.pixelRatio && this.iPhone),
            (this.iPad =
              -1 != navigator.userAgent.toLowerCase().indexOf("ipad")),
            "undefined" != typeof Int8Array
              ? ((this.littleEndian =
                  new Int8Array(new Int16Array([1]).buffer)[0] > 0),
                (this.typedArray = !0))
              : ((this.littleEndian = !1), (this.typedArray = !1)),
            (navigator.vibrate =
              navigator.vibrate ||
              navigator.webkitVibrate ||
              navigator.mozVibrate ||
              navigator.msVibrate),
            navigator.vibrate && (this.vibration = !0);
        },
        _checkCSS3D: function () {
          var e,
            t = document.createElement("p"),
            n = {
              webkitTransform: "-webkit-transform",
              OTransform: "-o-transform",
              msTransform: "-ms-transform",
              MozTransform: "-moz-transform",
              transform: "transform",
            };
          document.body.insertBefore(t, null);
          for (var r in n)
            void 0 !== t.style[r] &&
              ((t.style[r] = "translate3d(1px,1px,1px)"),
              (e = window.getComputedStyle(t).getPropertyValue(n[r])));
          document.body.removeChild(t),
            (this.css3D = void 0 !== e && e.length > 0 && "none" !== e);
        },
        canPlayAudio: function (e) {
          return "mp3" == e && this.mp3
            ? !0
            : "ogg" == e && (this.ogg || this.opus)
            ? !0
            : "m4a" == e && this.m4a
            ? !0
            : "wav" == e && this.wav
            ? !0
            : "webm" == e && this.webm
            ? !0
            : !1;
        },
        isConsoleOpen: function () {
          return window.console && window.console.firebug
            ? !0
            : window.console &&
              (console.profile(),
              console.profileEnd(),
              console.clear && console.clear(),
              console.profiles)
            ? console.profiles.length > 0
            : !1;
        },
      }),
      (t.Device.prototype.constructor = t.Device),
      (t.RequestAnimationFrame = function (e, t) {
        "undefined" == typeof t && (t = !1),
          (this.game = e),
          (this.isRunning = !1),
          (this.forceSetTimeOut = t);
        for (
          var n = ["ms", "moz", "webkit", "o"], r = 0;
          r < n.length && !window.requestAnimationFrame;
          r++
        )
          (window.requestAnimationFrame =
            window[n[r] + "RequestAnimationFrame"]),
            (window.cancelAnimationFrame =
              window[n[r] + "CancelAnimationFrame"]);
        (this._isSetTimeOut = !1),
          (this._onLoop = null),
          (this._timeOutID = null);
      }),
      (t.RequestAnimationFrame.prototype = {
        start: function () {
          this.isRunning = !0;
          var e = this;
          !window.requestAnimationFrame || this.forceSetTimeOut
            ? ((this._isSetTimeOut = !0),
              (this._onLoop = function () {
                return e.updateSetTimeout();
              }),
              (this._timeOutID = window.setTimeout(this._onLoop, 0)))
            : ((this._isSetTimeOut = !1),
              (this._onLoop = function (t) {
                return e.updateRAF(t);
              }),
              (this._timeOutID = window.requestAnimationFrame(this._onLoop)));
        },
        updateRAF: function () {
          this.game.update(Date.now()),
            (this._timeOutID = window.requestAnimationFrame(this._onLoop));
        },
        updateSetTimeout: function () {
          this.game.update(Date.now()),
            (this._timeOutID = window.setTimeout(
              this._onLoop,
              this.game.time.timeToCall
            ));
        },
        stop: function () {
          this._isSetTimeOut
            ? clearTimeout(this._timeOutID)
            : window.cancelAnimationFrame(this._timeOutID),
            (this.isRunning = !1);
        },
        isSetTimeOut: function () {
          return this._isSetTimeOut;
        },
        isRAF: function () {
          return this._isSetTimeOut === !1;
        },
      }),
      (t.RequestAnimationFrame.prototype.constructor = t.RequestAnimationFrame),
      (t.Math = {
        PI2: 2 * Math.PI,
        fuzzyEqual: function (e, t, n) {
          return "undefined" == typeof n && (n = 1e-4), Math.abs(e - t) < n;
        },
        fuzzyLessThan: function (e, t, n) {
          return "undefined" == typeof n && (n = 1e-4), t + n > e;
        },
        fuzzyGreaterThan: function (e, t, n) {
          return "undefined" == typeof n && (n = 1e-4), e > t - n;
        },
        fuzzyCeil: function (e, t) {
          return "undefined" == typeof t && (t = 1e-4), Math.ceil(e - t);
        },
        fuzzyFloor: function (e, t) {
          return "undefined" == typeof t && (t = 1e-4), Math.floor(e + t);
        },
        average: function () {
          for (var e = [], t = 0; t < arguments.length - 0; t++)
            e[t] = arguments[t + 0];
          for (var n = 0, r = 0; r < e.length; r++) n += e[r];
          return n / e.length;
        },
        truncate: function (e) {
          return e > 0 ? Math.floor(e) : Math.ceil(e);
        },
        shear: function (e) {
          return e % 1;
        },
        snapTo: function (e, t, n) {
          return (
            "undefined" == typeof n && (n = 0),
            0 === t ? e : ((e -= n), (e = t * Math.round(e / t)), n + e)
          );
        },
        snapToFloor: function (e, t, n) {
          return (
            "undefined" == typeof n && (n = 0),
            0 === t ? e : ((e -= n), (e = t * Math.floor(e / t)), n + e)
          );
        },
        snapToCeil: function (e, t, n) {
          return (
            "undefined" == typeof n && (n = 0),
            0 === t ? e : ((e -= n), (e = t * Math.ceil(e / t)), n + e)
          );
        },
        snapToInArray: function (e, t, n) {
          if (("undefined" == typeof n && (n = !0), n && t.sort(), e < t[0]))
            return t[0];
          for (var r = 1; t[r] < e; ) r++;
          var i = t[r - 1],
            s = r < t.length ? t[r] : Number.POSITIVE_INFINITY;
          return e - i >= s - e ? s : i;
        },
        roundTo: function (e, t, n) {
          "undefined" == typeof t && (t = 0),
            "undefined" == typeof n && (n = 10);
          var r = Math.pow(n, -t);
          return Math.round(e * r) / r;
        },
        floorTo: function (e, t, n) {
          "undefined" == typeof t && (t = 0),
            "undefined" == typeof n && (n = 10);
          var r = Math.pow(n, -t);
          return Math.floor(e * r) / r;
        },
        ceilTo: function (e, t, n) {
          "undefined" == typeof t && (t = 0),
            "undefined" == typeof n && (n = 10);
          var r = Math.pow(n, -t);
          return Math.ceil(e * r) / r;
        },
        interpolateFloat: function (e, t, n) {
          return (t - e) * n + e;
        },
        angleBetween: function (e, t, n, r) {
          return Math.atan2(n - e, r - t);
        },
        angleBetweenPoints: function (e, t) {
          return Math.atan2(t.x - e.x, t.y - e.y);
        },
        reverseAngle: function (e) {
          return this.normalizeAngle(e + Math.PI, !0);
        },
        normalizeAngle: function (e) {
          return (e %= 2 * Math.PI), e >= 0 ? e : e + 2 * Math.PI;
        },
        normalizeLatitude: function (e) {
          return Math.max(-90, Math.min(90, e));
        },
        normalizeLongitude: function (e) {
          return e % 360 == 180
            ? 180
            : ((e %= 360), -180 > e ? e + 360 : e > 180 ? e - 360 : e);
        },
        nearestAngleBetween: function (e, t, n) {
          "undefined" == typeof n && (n = !0);
          var r = n ? Math.PI : 180;
          return (
            (e = this.normalizeAngle(e, n)),
            (t = this.normalizeAngle(t, n)),
            -r / 2 > e && t > r / 2 && (e += 2 * r),
            -r / 2 > t && e > r / 2 && (t += 2 * r),
            t - e
          );
        },
        interpolateAngles: function (e, t, n, r, i) {
          return (
            "undefined" == typeof r && (r = !0),
            "undefined" == typeof i && (i = null),
            (e = this.normalizeAngle(e, r)),
            (t = this.normalizeAngleToAnother(t, e, r)),
            "function" == typeof i
              ? i(n, e, t - e, 1)
              : this.interpolateFloat(e, t, n)
          );
        },
        chanceRoll: function (e) {
          return (
            "undefined" == typeof e && (e = 50),
            0 >= e ? !1 : e >= 100 ? !0 : 100 * Math.random() >= e ? !1 : !0
          );
        },
        numberArray: function (e, t) {
          for (var n = [], r = e; t >= r; r++) n.push(r);
          return n;
        },
        maxAdd: function (e, t, n) {
          return (e += t), e > n && (e = n), e;
        },
        minSub: function (e, t, n) {
          return (e -= t), n > e && (e = n), e;
        },
        wrap: function (e, t, n) {
          var r = n - t;
          if (0 >= r) return 0;
          var i = (e - t) % r;
          return 0 > i && (i += r), i + t;
        },
        wrapValue: function (e, t, n) {
          var r;
          return (
            (e = Math.abs(e)),
            (t = Math.abs(t)),
            (n = Math.abs(n)),
            (r = (e + t) % n)
          );
        },
        randomSign: function () {
          return Math.random() > 0.5 ? 1 : -1;
        },
        isOdd: function (e) {
          return 1 & e;
        },
        isEven: function (e) {
          return 1 & e ? !1 : !0;
        },
        min: function () {
          if (1 === arguments.length && "object" == typeof arguments[0])
            var e = arguments[0];
          else var e = arguments;
          for (var t = 1, n = 0, r = e.length; r > t; t++)
            e[t] < e[n] && (n = t);
          return e[n];
        },
        max: function () {
          if (1 === arguments.length && "object" == typeof arguments[0])
            var e = arguments[0];
          else var e = arguments;
          for (var t = 1, n = 0, r = e.length; r > t; t++)
            e[t] > e[n] && (n = t);
          return e[n];
        },
        minProperty: function (e) {
          if (2 === arguments.length && "object" == typeof arguments[1])
            var t = arguments[1];
          else var t = arguments.slice(1);
          for (var n = 1, r = 0, i = t.length; i > n; n++)
            t[n][e] < t[r][e] && (r = n);
          return t[r][e];
        },
        maxProperty: function (e) {
          if (2 === arguments.length && "object" == typeof arguments[1])
            var t = arguments[1];
          else var t = arguments.slice(1);
          for (var n = 1, r = 0, i = t.length; i > n; n++)
            t[n][e] > t[r][e] && (r = n);
          return t[r][e];
        },
        wrapAngle: function (e, t) {
          var n = t ? Math.PI / 180 : 1;
          return this.wrap(e, -180 * n, 180 * n);
        },
        angleLimit: function (e, t, n) {
          var r = e;
          return e > n ? (r = n) : t > e && (r = t), r;
        },
        linearInterpolation: function (e, t) {
          var n = e.length - 1,
            r = n * t,
            i = Math.floor(r);
          return 0 > t
            ? this.linear(e[0], e[1], r)
            : t > 1
            ? this.linear(e[n], e[n - 1], n - r)
            : this.linear(e[i], e[i + 1 > n ? n : i + 1], r - i);
        },
        bezierInterpolation: function (e, t) {
          for (var n = 0, r = e.length - 1, i = 0; r >= i; i++)
            n +=
              Math.pow(1 - t, r - i) *
              Math.pow(t, i) *
              e[i] *
              this.bernstein(r, i);
          return n;
        },
        catmullRomInterpolation: function (e, t) {
          var n = e.length - 1,
            r = n * t,
            i = Math.floor(r);
          return e[0] === e[n]
            ? (0 > t && (i = Math.floor((r = n * (1 + t)))),
              this.catmullRom(
                e[(i - 1 + n) % n],
                e[i],
                e[(i + 1) % n],
                e[(i + 2) % n],
                r - i
              ))
            : 0 > t
            ? e[0] - (this.catmullRom(e[0], e[0], e[1], e[1], -r) - e[0])
            : t > 1
            ? e[n] -
              (this.catmullRom(e[n], e[n], e[n - 1], e[n - 1], r - n) - e[n])
            : this.catmullRom(
                e[i ? i - 1 : 0],
                e[i],
                e[i + 1 > n ? n : i + 1],
                e[i + 2 > n ? n : i + 2],
                r - i
              );
        },
        linear: function (e, t, n) {
          return (t - e) * n + e;
        },
        bernstein: function (e, t) {
          return this.factorial(e) / this.factorial(t) / this.factorial(e - t);
        },
        catmullRom: function (e, t, n, r, i) {
          var s = 0.5 * (n - e),
            o = 0.5 * (r - t),
            u = i * i,
            a = i * u;
          return (
            (2 * t - 2 * n + s + o) * a +
            (-3 * t + 3 * n - 2 * s - o) * u +
            s * i +
            t
          );
        },
        difference: function (e, t) {
          return Math.abs(e - t);
        },
        getRandom: function (e, t, n) {
          if (
            ("undefined" == typeof t && (t = 0),
            "undefined" == typeof n && (n = 0),
            null != e)
          ) {
            var r = n;
            if (((0 === r || r > e.length - t) && (r = e.length - t), r > 0))
              return e[t + Math.floor(Math.random() * r)];
          }
          return null;
        },
        removeRandom: function (e, t, n) {
          if (
            ("undefined" == typeof t && (t = 0),
            "undefined" == typeof n && (n = 0),
            null != e)
          ) {
            var r = n;
            if (((0 === r || r > e.length - t) && (r = e.length - t), r > 0)) {
              var i = t + Math.floor(Math.random() * r),
                s = e.splice(i, 1);
              return s[0];
            }
          }
          return null;
        },
        floor: function (e) {
          var t = 0 | e;
          return e > 0 ? t : t != e ? t - 1 : t;
        },
        ceil: function (e) {
          var t = 0 | e;
          return e > 0 && t != e ? t + 1 : t;
        },
        sinCosGenerator: function (e, t, n, r) {
          "undefined" == typeof t && (t = 1),
            "undefined" == typeof n && (n = 1),
            "undefined" == typeof r && (r = 1);
          for (
            var i = t, s = n, o = (r * Math.PI) / e, u = [], a = [], f = 0;
            e > f;
            f++
          )
            (s -= i * o), (i += s * o), (u[f] = s), (a[f] = i);
          return { sin: a, cos: u, length: e };
        },
        shift: function (e) {
          var t = e.shift();
          return e.push(t), t;
        },
        shuffleArray: function (e) {
          for (var t = e.length - 1; t > 0; t--) {
            var n = Math.floor(Math.random() * (t + 1)),
              r = e[t];
            (e[t] = e[n]), (e[n] = r);
          }
          return e;
        },
        distance: function (e, t, n, r) {
          var i = e - n,
            s = t - r;
          return Math.sqrt(i * i + s * s);
        },
        distancePow: function (e, t, n, r, i) {
          return (
            "undefined" == typeof i && (i = 2),
            Math.sqrt(Math.pow(n - e, i) + Math.pow(r - t, i))
          );
        },
        distanceRounded: function (e, n, r, i) {
          return Math.round(t.Math.distance(e, n, r, i));
        },
        clamp: function (e, t, n) {
          return t > e ? t : e > n ? n : e;
        },
        clampBottom: function (e, t) {
          return t > e ? t : e;
        },
        within: function (e, t, n) {
          return Math.abs(e - t) <= n;
        },
        mapLinear: function (e, t, n, r, i) {
          return r + ((e - t) * (i - r)) / (n - t);
        },
        smoothstep: function (e, t, n) {
          return t >= e
            ? 0
            : e >= n
            ? 1
            : ((e = (e - t) / (n - t)), e * e * (3 - 2 * e));
        },
        smootherstep: function (e, t, n) {
          return t >= e
            ? 0
            : e >= n
            ? 1
            : ((e = (e - t) / (n - t)), e * e * e * (e * (6 * e - 15) + 10));
        },
        sign: function (e) {
          return 0 > e ? -1 : e > 0 ? 1 : 0;
        },
        degToRad: (function () {
          var e = Math.PI / 180;
          return function (t) {
            return t * e;
          };
        })(),
        radToDeg: (function () {
          var e = 180 / Math.PI;
          return function (t) {
            return t * e;
          };
        })(),
      }),
      (t.RandomDataGenerator = function (e) {
        "undefined" == typeof e && (e = []),
          (this.c = 1),
          (this.s0 = 0),
          (this.s1 = 0),
          (this.s2 = 0),
          this.sow(e);
      }),
      (t.RandomDataGenerator.prototype = {
        rnd: function () {
          var e = 2091639 * this.s0 + 2.3283064365386963e-10 * this.c;
          return (
            (this.c = 0 | e),
            (this.s0 = this.s1),
            (this.s1 = this.s2),
            (this.s2 = e - this.c),
            this.s2
          );
        },
        sow: function (e) {
          "undefined" == typeof e && (e = []),
            (this.s0 = this.hash(" ")),
            (this.s1 = this.hash(this.s0)),
            (this.s2 = this.hash(this.s1)),
            (this.c = 1);
          for (var t, n = 0; (t = e[n++]); )
            (this.s0 -= this.hash(t)),
              (this.s0 += ~~(this.s0 < 0)),
              (this.s1 -= this.hash(t)),
              (this.s1 += ~~(this.s1 < 0)),
              (this.s2 -= this.hash(t)),
              (this.s2 += ~~(this.s2 < 0));
        },
        hash: function (e) {
          var t, n, r;
          for (r = 4022871197, e = e.toString(), n = 0; n < e.length; n++)
            (r += e.charCodeAt(n)),
              (t = 0.02519603282416938 * r),
              (r = t >>> 0),
              (t -= r),
              (t *= r),
              (r = t >>> 0),
              (t -= r),
              (r += 4294967296 * t);
          return 2.3283064365386963e-10 * (r >>> 0);
        },
        integer: function () {
          return 4294967296 * this.rnd.apply(this);
        },
        frac: function () {
          return (
            this.rnd.apply(this) +
            1.1102230246251565e-16 * ((2097152 * this.rnd.apply(this)) | 0)
          );
        },
        real: function () {
          return this.integer() + this.frac();
        },
        integerInRange: function (e, t) {
          return Math.round(this.realInRange(e, t));
        },
        realInRange: function (e, t) {
          return this.frac() * (t - e) + e;
        },
        normal: function () {
          return 1 - 2 * this.frac();
        },
        uuid: function () {
          var e = "",
            t = "";
          for (
            t = e = "";
            e++ < 36;
            t +=
              ~e % 5 | ((3 * e) & 4)
                ? (15 ^ e ? 8 ^ (this.frac() * (20 ^ e ? 16 : 4)) : 4).toString(
                    16
                  )
                : "-"
          );
          return t;
        },
        pick: function (e) {
          return e[this.integerInRange(0, e.length - 1)];
        },
        weightedPick: function (e) {
          return e[~~(Math.pow(this.frac(), 2) * (e.length - 1))];
        },
        timestamp: function (e, t) {
          return this.realInRange(e || 9466848e5, t || 1577862e6);
        },
        angle: function () {
          return this.integerInRange(-180, 180);
        },
      }),
      (t.RandomDataGenerator.prototype.constructor = t.RandomDataGenerator),
      (t.QuadTree = function (e, t, n, r, i, s, o) {
        (this.maxObjects = 10),
          (this.maxLevels = 4),
          (this.level = 0),
          (this.bounds = {}),
          (this.objects = []),
          (this.nodes = []),
          this.reset(e, t, n, r, i, s, o);
      }),
      (t.QuadTree.prototype = {
        reset: function (e, t, n, r, i, s, o) {
          (this.maxObjects = i || 10),
            (this.maxLevels = s || 4),
            (this.level = o || 0),
            (this.bounds = {
              x: Math.round(e),
              y: Math.round(t),
              width: n,
              height: r,
              subWidth: Math.floor(n / 2),
              subHeight: Math.floor(r / 2),
              right: Math.round(e) + Math.floor(n / 2),
              bottom: Math.round(t) + Math.floor(r / 2),
            }),
            (this.objects.length = 0),
            (this.nodes.length = 0);
        },
        populate: function (e) {
          e.forEach(this.populateHandler, this, !0);
        },
        populateHandler: function (e) {
          e.body && e.exists && this.insert(e.body);
        },
        split: function () {
          this.level++,
            (this.nodes[0] = new t.QuadTree(
              this.bounds.right,
              this.bounds.y,
              this.bounds.subWidth,
              this.bounds.subHeight,
              this.maxObjects,
              this.maxLevels,
              this.level
            )),
            (this.nodes[1] = new t.QuadTree(
              this.bounds.x,
              this.bounds.y,
              this.bounds.subWidth,
              this.bounds.subHeight,
              this.maxObjects,
              this.maxLevels,
              this.level
            )),
            (this.nodes[2] = new t.QuadTree(
              this.bounds.x,
              this.bounds.bottom,
              this.bounds.subWidth,
              this.bounds.subHeight,
              this.maxObjects,
              this.maxLevels,
              this.level
            )),
            (this.nodes[3] = new t.QuadTree(
              this.bounds.right,
              this.bounds.bottom,
              this.bounds.subWidth,
              this.bounds.subHeight,
              this.maxObjects,
              this.maxLevels,
              this.level
            ));
        },
        insert: function (e) {
          var t,
            n = 0;
          if (null != this.nodes[0] && ((t = this.getIndex(e)), -1 !== t))
            return void this.nodes[t].insert(e);
          if (
            (this.objects.push(e),
            this.objects.length > this.maxObjects &&
              this.level < this.maxLevels)
          )
            for (
              null == this.nodes[0] && this.split();
              n < this.objects.length;

            )
              (t = this.getIndex(this.objects[n])),
                -1 !== t
                  ? this.nodes[t].insert(this.objects.splice(n, 1)[0])
                  : n++;
        },
        getIndex: function (e) {
          var t = -1;
          return (
            e.x < this.bounds.right && e.right < this.bounds.right
              ? e.y < this.bounds.bottom && e.bottom < this.bounds.bottom
                ? (t = 1)
                : e.y > this.bounds.bottom && (t = 2)
              : e.x > this.bounds.right &&
                (e.y < this.bounds.bottom && e.bottom < this.bounds.bottom
                  ? (t = 0)
                  : e.y > this.bounds.bottom && (t = 3)),
            t
          );
        },
        retrieve: function (e) {
          var t = this.objects,
            n = this.getIndex(e.body);
          return (
            this.nodes[0] &&
              (-1 !== n
                ? (t = t.concat(this.nodes[n].retrieve(e)))
                : ((t = t.concat(this.nodes[0].retrieve(e))),
                  (t = t.concat(this.nodes[1].retrieve(e))),
                  (t = t.concat(this.nodes[2].retrieve(e))),
                  (t = t.concat(this.nodes[3].retrieve(e))))),
            t
          );
        },
        clear: function () {
          this.objects.length = 0;
          for (var e = this.nodes.length; e--; )
            this.nodes[e].clear(), this.nodes.splice(e, 1);
          this.nodes.length = 0;
        },
      }),
      (t.QuadTree.prototype.constructor = t.QuadTree),
      (t.Net = function (e) {
        this.game = e;
      }),
      (t.Net.prototype = {
        getHostName: function () {
          return window.location && window.location.hostname
            ? window.location.hostname
            : null;
        },
        checkDomainName: function (e) {
          return -1 !== window.location.hostname.indexOf(e);
        },
        updateQueryString: function (e, t, n, r) {
          "undefined" == typeof n && (n = !1),
            ("undefined" == typeof r || "" === r) && (r = window.location.href);
          var i = "",
            s = new RegExp("([?|&])" + e + "=.*?(&|#|$)(.*)", "gi");
          if (s.test(r))
            i =
              "undefined" != typeof t && null !== t
                ? r.replace(s, "$1" + e + "=" + t + "$2$3")
                : r.replace(s, "$1$3").replace(/(&|\?)$/, "");
          else if ("undefined" != typeof t && null !== t) {
            var o = -1 !== r.indexOf("?") ? "&" : "?",
              u = r.split("#");
            (r = u[0] + o + e + "=" + t), u[1] && (r += "#" + u[1]), (i = r);
          } else i = r;
          return n ? void (window.location.href = i) : i;
        },
        getQueryString: function (e) {
          "undefined" == typeof e && (e = "");
          var t = {},
            n = location.search.substring(1).split("&");
          for (var r in n) {
            var i = n[r].split("=");
            if (i.length > 1) {
              if (e && e == this.decodeURI(i[0])) return this.decodeURI(i[1]);
              t[this.decodeURI(i[0])] = this.decodeURI(i[1]);
            }
          }
          return t;
        },
        decodeURI: function (e) {
          return decodeURIComponent(e.replace(/\+/g, " "));
        },
      }),
      (t.Net.prototype.constructor = t.Net),
      (t.TweenManager = function (e) {
        (this.game = e),
          (this._tweens = []),
          (this._add = []),
          this.game.onPause.add(this._pauseAll, this),
          this.game.onResume.add(this._resumeAll, this);
      }),
      (t.TweenManager.prototype = {
        getAll: function () {
          return this._tweens;
        },
        removeAll: function () {
          for (var e = 0; e < this._tweens.length; e++)
            this._tweens[e].pendingDelete = !0;
          this._add = [];
        },
        add: function (e) {
          (e._manager = this), this._add.push(e);
        },
        create: function (e) {
          return new t.Tween(e, this.game, this);
        },
        remove: function (e) {
          var t = this._tweens.indexOf(e);
          -1 !== t && (this._tweens[t].pendingDelete = !0);
        },
        update: function () {
          if (0 === this._tweens.length && 0 === this._add.length) return !1;
          for (var e = 0, t = this._tweens.length; t > e; )
            this._tweens[e].update(this.game.time.now)
              ? e++
              : (this._tweens.splice(e, 1), t--);
          return (
            this._add.length > 0 &&
              ((this._tweens = this._tweens.concat(this._add)),
              (this._add.length = 0)),
            !0
          );
        },
        isTweening: function (e) {
          return this._tweens.some(function (t) {
            return t._object === e;
          });
        },
        _pauseAll: function () {
          for (var e = this._tweens.length - 1; e >= 0; e--)
            this._tweens[e]._pause();
        },
        _resumeAll: function () {
          for (var e = this._tweens.length - 1; e >= 0; e--)
            this._tweens[e]._resume();
        },
        pauseAll: function () {
          for (var e = this._tweens.length - 1; e >= 0; e--)
            this._tweens[e].pause();
        },
        resumeAll: function () {
          for (var e = this._tweens.length - 1; e >= 0; e--)
            this._tweens[e].resume(!0);
        },
      }),
      (t.TweenManager.prototype.constructor = t.TweenManager),
      (t.Tween = function (e, n, r) {
        (this._object = e),
          (this.game = n),
          (this._manager = r),
          (this._valuesStart = {}),
          (this._valuesEnd = {}),
          (this._valuesStartRepeat = {}),
          (this._duration = 1e3),
          (this._repeat = 0),
          (this._yoyo = !1),
          (this._reversed = !1),
          (this._delayTime = 0),
          (this._startTime = null),
          (this._easingFunction = t.Easing.Linear.None),
          (this._interpolationFunction = t.Math.linearInterpolation),
          (this._chainedTweens = []),
          (this._onStartCallbackFired = !1),
          (this._onUpdateCallback = null),
          (this._onUpdateCallbackContext = null),
          (this._paused = !1),
          (this._pausedTime = 0),
          (this._codePaused = !1),
          (this.pendingDelete = !1),
          (this.onStart = new t.Signal()),
          (this.onLoop = new t.Signal()),
          (this.onComplete = new t.Signal()),
          (this.isRunning = !1);
      }),
      (t.Tween.prototype = {
        to: function (e, t, n, r, i, s, o) {
          (t = t || 1e3),
            (n = n || null),
            (r = r || !1),
            (i = i || 0),
            (s = s || 0),
            (o = o || !1);
          var u;
          return (
            this._parent
              ? ((u = this._manager.create(this._object)),
                this._lastChild.chain(u),
                (this._lastChild = u))
              : ((u = this), (this._parent = this), (this._lastChild = this)),
            (u._repeat = s),
            (u._duration = t),
            (u._valuesEnd = e),
            null !== n && (u._easingFunction = n),
            i > 0 && (u._delayTime = i),
            (u._yoyo = o),
            r ? this.start() : this
          );
        },
        start: function () {
          if (null !== this.game && null !== this._object) {
            this._manager.add(this),
              (this.isRunning = !0),
              (this._onStartCallbackFired = !1),
              (this._startTime = this.game.time.now + this._delayTime);
            for (var e in this._valuesEnd) {
              if (Array.isArray(this._valuesEnd[e])) {
                if (0 === this._valuesEnd[e].length) continue;
                this._valuesEnd[e] = [this._object[e]].concat(
                  this._valuesEnd[e]
                );
              }
              (this._valuesStart[e] = this._object[e]),
                Array.isArray(this._valuesStart[e]) ||
                  (this._valuesStart[e] *= 1),
                (this._valuesStartRepeat[e] = this._valuesStart[e] || 0);
            }
            return this;
          }
        },
        generateData: function (e, t) {
          if (null === this.game || null === this._object) return null;
          this._startTime = 0;
          for (var n in this._valuesEnd) {
            if (Array.isArray(this._valuesEnd[n])) {
              if (0 === this._valuesEnd[n].length) continue;
              this._valuesEnd[n] = [this._object[n]].concat(this._valuesEnd[n]);
            }
            (this._valuesStart[n] = this._object[n]),
              Array.isArray(this._valuesStart[n]) ||
                (this._valuesStart[n] *= 1),
              (this._valuesStartRepeat[n] = this._valuesStart[n] || 0);
          }
          for (
            var r = 0,
              i = Math.floor(e * (this._duration / 1e3)),
              s = this._duration / i,
              o = [];
            i--;

          ) {
            var n,
              u = (r - this._startTime) / this._duration;
            u = u > 1 ? 1 : u;
            var a = this._easingFunction(u),
              f = {};
            for (n in this._valuesEnd) {
              var l = this._valuesStart[n] || 0,
                c = this._valuesEnd[n];
              c instanceof Array
                ? (f[n] = this._interpolationFunction(c, a))
                : ("string" == typeof c && (c = l + parseFloat(c, 10)),
                  "number" == typeof c && (f[n] = l + (c - l) * a));
            }
            o.push(f), (r += s);
          }
          if (this._yoyo) {
            var h = o.slice();
            h.reverse(), (o = o.concat(h));
          }
          return "undefined" != typeof t ? (t = t.concat(o)) : o;
        },
        stop: function () {
          return (
            (this.isRunning = !1),
            (this._onUpdateCallback = null),
            this._manager.remove(this),
            this
          );
        },
        delay: function (e) {
          return (this._delayTime = e), this;
        },
        repeat: function (e) {
          return (this._repeat = e), this;
        },
        yoyo: function (e) {
          return (this._yoyo = e), this;
        },
        easing: function (e) {
          return (this._easingFunction = e), this;
        },
        interpolation: function (e) {
          return (this._interpolationFunction = e), this;
        },
        chain: function () {
          return (this._chainedTweens = arguments), this;
        },
        loop: function () {
          return this._lastChild.chain(this), this;
        },
        onUpdateCallback: function (e, t) {
          return (
            (this._onUpdateCallback = e),
            (this._onUpdateCallbackContext = t),
            this
          );
        },
        pause: function () {
          (this._codePaused = !0),
            (this._paused = !0),
            (this._pausedTime = this.game.time.now);
        },
        _pause: function () {
          this._codePaused ||
            ((this._paused = !0), (this._pausedTime = this.game.time.now));
        },
        resume: function () {
          this._paused &&
            ((this._paused = !1),
            (this._codePaused = !1),
            (this._startTime += this.game.time.now - this._pausedTime));
        },
        _resume: function () {
          this._codePaused ||
            ((this._startTime += this.game.time.pauseDuration),
            (this._paused = !1));
        },
        update: function (e) {
          if (this.pendingDelete) return !1;
          if (this._paused || e < this._startTime) return !0;
          var t;
          if (e < this._startTime) return !0;
          this._onStartCallbackFired === !1 &&
            (this.onStart.dispatch(this._object),
            (this._onStartCallbackFired = !0));
          var n = (e - this._startTime) / this._duration;
          n = n > 1 ? 1 : n;
          var r = this._easingFunction(n);
          for (t in this._valuesEnd) {
            var i = this._valuesStart[t] || 0,
              s = this._valuesEnd[t];
            s instanceof Array
              ? (this._object[t] = this._interpolationFunction(s, r))
              : ("string" == typeof s && (s = i + parseFloat(s, 10)),
                "number" == typeof s && (this._object[t] = i + (s - i) * r));
          }
          if (
            (null !== this._onUpdateCallback &&
              this._onUpdateCallback.call(
                this._onUpdateCallbackContext,
                this,
                r
              ),
            1 == n)
          ) {
            if (this._repeat > 0) {
              isFinite(this._repeat) && this._repeat--;
              for (t in this._valuesStartRepeat) {
                if (
                  ("string" == typeof this._valuesEnd[t] &&
                    (this._valuesStartRepeat[t] =
                      this._valuesStartRepeat[t] +
                      parseFloat(this._valuesEnd[t], 10)),
                  this._yoyo)
                ) {
                  var o = this._valuesStartRepeat[t];
                  (this._valuesStartRepeat[t] = this._valuesEnd[t]),
                    (this._valuesEnd[t] = o),
                    (this._reversed = !this._reversed);
                }
                this._valuesStart[t] = this._valuesStartRepeat[t];
              }
              return (
                (this._startTime = e + this._delayTime),
                this.onLoop.dispatch(this._object),
                !0
              );
            }
            (this.isRunning = !1), this.onComplete.dispatch(this._object);
            for (var u = 0, a = this._chainedTweens.length; a > u; u++)
              this._chainedTweens[u].start(e);
            return !1;
          }
          return !0;
        },
      }),
      (t.Tween.prototype.constructor = t.Tween),
      (t.Easing = {
        Linear: {
          None: function (e) {
            return e;
          },
        },
        Quadratic: {
          In: function (e) {
            return e * e;
          },
          Out: function (e) {
            return e * (2 - e);
          },
          InOut: function (e) {
            return (e *= 2) < 1 ? 0.5 * e * e : -0.5 * (--e * (e - 2) - 1);
          },
        },
        Cubic: {
          In: function (e) {
            return e * e * e;
          },
          Out: function (e) {
            return --e * e * e + 1;
          },
          InOut: function (e) {
            return (e *= 2) < 1
              ? 0.5 * e * e * e
              : 0.5 * ((e -= 2) * e * e + 2);
          },
        },
        Quartic: {
          In: function (e) {
            return e * e * e * e;
          },
          Out: function (e) {
            return 1 - --e * e * e * e;
          },
          InOut: function (e) {
            return (e *= 2) < 1
              ? 0.5 * e * e * e * e
              : -0.5 * ((e -= 2) * e * e * e - 2);
          },
        },
        Quintic: {
          In: function (e) {
            return e * e * e * e * e;
          },
          Out: function (e) {
            return --e * e * e * e * e + 1;
          },
          InOut: function (e) {
            return (e *= 2) < 1
              ? 0.5 * e * e * e * e * e
              : 0.5 * ((e -= 2) * e * e * e * e + 2);
          },
        },
        Sinusoidal: {
          In: function (e) {
            return 1 - Math.cos((e * Math.PI) / 2);
          },
          Out: function (e) {
            return Math.sin((e * Math.PI) / 2);
          },
          InOut: function (e) {
            return 0.5 * (1 - Math.cos(Math.PI * e));
          },
        },
        Exponential: {
          In: function (e) {
            return 0 === e ? 0 : Math.pow(1024, e - 1);
          },
          Out: function (e) {
            return 1 === e ? 1 : 1 - Math.pow(2, -10 * e);
          },
          InOut: function (e) {
            return 0 === e
              ? 0
              : 1 === e
              ? 1
              : (e *= 2) < 1
              ? 0.5 * Math.pow(1024, e - 1)
              : 0.5 * (-Math.pow(2, -10 * (e - 1)) + 2);
          },
        },
        Circular: {
          In: function (e) {
            return 1 - Math.sqrt(1 - e * e);
          },
          Out: function (e) {
            return Math.sqrt(1 - --e * e);
          },
          InOut: function (e) {
            return (e *= 2) < 1
              ? -0.5 * (Math.sqrt(1 - e * e) - 1)
              : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
          },
        },
        Elastic: {
          In: function (e) {
            var t,
              n = 0.1,
              r = 0.4;
            return 0 === e
              ? 0
              : 1 === e
              ? 1
              : (!n || 1 > n
                  ? ((n = 1), (t = r / 4))
                  : (t = (r * Math.asin(1 / n)) / (2 * Math.PI)),
                -(
                  n *
                  Math.pow(2, 10 * (e -= 1)) *
                  Math.sin((2 * (e - t) * Math.PI) / r)
                ));
          },
          Out: function (e) {
            var t,
              n = 0.1,
              r = 0.4;
            return 0 === e
              ? 0
              : 1 === e
              ? 1
              : (!n || 1 > n
                  ? ((n = 1), (t = r / 4))
                  : (t = (r * Math.asin(1 / n)) / (2 * Math.PI)),
                n *
                  Math.pow(2, -10 * e) *
                  Math.sin((2 * (e - t) * Math.PI) / r) +
                  1);
          },
          InOut: function (e) {
            var t,
              n = 0.1,
              r = 0.4;
            return 0 === e
              ? 0
              : 1 === e
              ? 1
              : (!n || 1 > n
                  ? ((n = 1), (t = r / 4))
                  : (t = (r * Math.asin(1 / n)) / (2 * Math.PI)),
                (e *= 2) < 1
                  ? -0.5 *
                    n *
                    Math.pow(2, 10 * (e -= 1)) *
                    Math.sin((2 * (e - t) * Math.PI) / r)
                  : n *
                      Math.pow(2, -10 * (e -= 1)) *
                      Math.sin((2 * (e - t) * Math.PI) / r) *
                      0.5 +
                    1);
          },
        },
        Back: {
          In: function (e) {
            var t = 1.70158;
            return e * e * ((t + 1) * e - t);
          },
          Out: function (e) {
            var t = 1.70158;
            return --e * e * ((t + 1) * e + t) + 1;
          },
          InOut: function (e) {
            var t = 2.5949095;
            return (e *= 2) < 1
              ? 0.5 * e * e * ((t + 1) * e - t)
              : 0.5 * ((e -= 2) * e * ((t + 1) * e + t) + 2);
          },
        },
        Bounce: {
          In: function (e) {
            return 1 - t.Easing.Bounce.Out(1 - e);
          },
          Out: function (e) {
            return 1 / 2.75 > e
              ? 7.5625 * e * e
              : 2 / 2.75 > e
              ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
              : 2.5 / 2.75 > e
              ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
              : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
          },
          InOut: function (e) {
            return 0.5 > e
              ? 0.5 * t.Easing.Bounce.In(2 * e)
              : 0.5 * t.Easing.Bounce.Out(2 * e - 1) + 0.5;
          },
        },
      }),
      (t.Time = function (e) {
        (this.game = e),
          (this.time = 0),
          (this.now = 0),
          (this.elapsed = 0),
          (this.pausedTime = 0),
          (this.advancedTiming = !1),
          (this.fps = 0),
          (this.fpsMin = 1e3),
          (this.fpsMax = 0),
          (this.msMin = 1e3),
          (this.msMax = 0),
          (this.physicsElapsed = 0),
          (this.deltaCap = 0),
          (this.frames = 0),
          (this.pauseDuration = 0),
          (this.timeToCall = 0),
          (this.lastTime = 0),
          (this.events = new t.Timer(this.game, !1)),
          (this._started = 0),
          (this._timeLastSecond = 0),
          (this._pauseStarted = 0),
          (this._justResumed = !1),
          (this._timers = []),
          (this._len = 0),
          (this._i = 0);
      }),
      (t.Time.prototype = {
        boot: function () {
          (this._started = Date.now()), this.events.start();
        },
        create: function (e) {
          "undefined" == typeof e && (e = !0);
          var n = new t.Timer(this.game, e);
          return this._timers.push(n), n;
        },
        removeAll: function () {
          for (var e = 0; e < this._timers.length; e++)
            this._timers[e].destroy();
          (this._timers = []), this.events.removeAll();
        },
        update: function (e) {
          if (((this.now = e), this._justResumed)) {
            (this.time = this.now),
              (this._justResumed = !1),
              this.events.resume();
            for (var t = 0; t < this._timers.length; t++)
              this._timers[t]._resume();
          }
          if (
            ((this.timeToCall = this.game.math.max(
              0,
              16 - (e - this.lastTime)
            )),
            (this.elapsed = this.now - this.time),
            (this.physicsElapsed = this.elapsed / 1e3),
            this.deltaCap > 0 &&
              this.physicsElapsed > this.deltaCap &&
              (this.physicsElapsed = this.deltaCap),
            this.advancedTiming &&
              ((this.msMin = this.game.math.min(this.msMin, this.elapsed)),
              (this.msMax = this.game.math.max(this.msMax, this.elapsed)),
              this.frames++,
              this.now > this._timeLastSecond + 1e3 &&
                ((this.fps = Math.round(
                  (1e3 * this.frames) / (this.now - this._timeLastSecond)
                )),
                (this.fpsMin = this.game.math.min(this.fpsMin, this.fps)),
                (this.fpsMax = this.game.math.max(this.fpsMax, this.fps)),
                (this._timeLastSecond = this.now),
                (this.frames = 0))),
            (this.time = this.now),
            (this.lastTime = e + this.timeToCall),
            !this.game.paused)
          )
            for (
              this.events.update(this.now),
                this._i = 0,
                this._len = this._timers.length;
              this._i < this._len;

            )
              this._timers[this._i].update(this.now)
                ? this._i++
                : (this._timers.splice(this._i, 1), this._len--);
        },
        gamePaused: function () {
          (this._pauseStarted = this.now), this.events.pause();
          for (var e = this._timers.length; e--; ) this._timers[e]._pause();
        },
        gameResumed: function () {
          (this.pauseDuration = Date.now() - this._pauseStarted),
            (this.time = Date.now()),
            (this._justResumed = !0);
        },
        totalElapsedSeconds: function () {
          return 0.001 * (this.now - this._started);
        },
        elapsedSince: function (e) {
          return this.now - e;
        },
        elapsedSecondsSince: function (e) {
          return 0.001 * (this.now - e);
        },
        reset: function () {
          (this._started = this.now), this.removeAll();
        },
      }),
      (t.Time.prototype.constructor = t.Time),
      (t.Timer = function (e, n) {
        "undefined" == typeof n && (n = !0),
          (this.game = e),
          (this.running = !1),
          (this.autoDestroy = n),
          (this.expired = !1),
          (this.events = []),
          (this.onComplete = new t.Signal()),
          (this.nextTick = 0),
          (this.paused = !1),
          (this._codePaused = !1),
          (this._started = 0),
          (this._pauseStarted = 0),
          (this._pauseTotal = 0),
          (this._now = 0),
          (this._len = 0),
          (this._i = 0);
      }),
      (t.Timer.MINUTE = 6e4),
      (t.Timer.SECOND = 1e3),
      (t.Timer.HALF = 500),
      (t.Timer.QUARTER = 250),
      (t.Timer.prototype = {
        create: function (e, n, r, i, s, o) {
          var u = e;
          u += 0 === this._now ? this.game.time.now : this._now;
          var a = new t.TimerEvent(this, e, u, r, n, i, s, o);
          return this.events.push(a), this.order(), (this.expired = !1), a;
        },
        add: function (e, t, n) {
          return this.create(
            e,
            !1,
            0,
            t,
            n,
            Array.prototype.splice.call(arguments, 3)
          );
        },
        repeat: function (e, t, n, r) {
          return this.create(
            e,
            !1,
            t,
            n,
            r,
            Array.prototype.splice.call(arguments, 4)
          );
        },
        loop: function (e, t, n) {
          return this.create(
            e,
            !0,
            0,
            t,
            n,
            Array.prototype.splice.call(arguments, 3)
          );
        },
        start: function () {
          if (!this.running) {
            (this._started = this.game.time.now), (this.running = !0);
            for (var e = 0; e < this.events.length; e++)
              this.events[e].tick = this.events[e].delay + this._started;
          }
        },
        stop: function (e) {
          (this.running = !1),
            "undefined" == typeof e && (e = !0),
            e && (this.events.length = 0);
        },
        remove: function (e) {
          for (var t = 0; t < this.events.length; t++)
            if (this.events[t] === e)
              return (this.events[t].pendingDelete = !0), !0;
          return !1;
        },
        order: function () {
          this.events.length > 0 &&
            (this.events.sort(this.sortHandler),
            (this.nextTick = this.events[0].tick));
        },
        sortHandler: function (e, t) {
          return e.tick < t.tick ? -1 : e.tick > t.tick ? 1 : 0;
        },
        update: function (e) {
          if (this.paused) return !0;
          for (
            this._now = e, this._len = this.events.length, this._i = 0;
            this._i < this._len;

          )
            this.events[this._i].pendingDelete &&
              (this.events.splice(this._i, 1), this._len--),
              this._i++;
          if (
            ((this._len = this.events.length),
            this.running && this._now >= this.nextTick && this._len > 0)
          ) {
            for (
              this._i = 0;
              this._i < this._len &&
              this.running &&
              this._now >= this.events[this._i].tick;

            ) {
              var t = this._now - this.events[this._i].tick,
                n = this._now + this.events[this._i].delay - t;
              0 > n && (n = this._now + this.events[this._i].delay),
                this.events[this._i].loop === !0
                  ? ((this.events[this._i].tick = n),
                    this.events[this._i].callback.apply(
                      this.events[this._i].callbackContext,
                      this.events[this._i].args
                    ))
                  : this.events[this._i].repeatCount > 0
                  ? (this.events[this._i].repeatCount--,
                    (this.events[this._i].tick = n),
                    this.events[this._i].callback.apply(
                      this.events[this._i].callbackContext,
                      this.events[this._i].args
                    ))
                  : (this.events[this._i].callback.apply(
                      this.events[this._i].callbackContext,
                      this.events[this._i].args
                    ),
                    this.events.splice(this._i, 1),
                    this._len--),
                this._i++;
            }
            this.events.length > 0
              ? this.order()
              : ((this.expired = !0), this.onComplete.dispatch(this));
          }
          return this.expired && this.autoDestroy ? !1 : !0;
        },
        pause: function () {
          this.running &&
            !this.expired &&
            ((this._pauseStarted = this.game.time.now),
            (this.paused = !0),
            (this._codePaused = !0));
        },
        _pause: function () {
          this.running &&
            !this.expired &&
            ((this._pauseStarted = this.game.time.now), (this.paused = !0));
        },
        resume: function () {
          if (this.running && !this.expired) {
            var e = this.game.time.now - this._pauseStarted;
            this._pauseTotal += e;
            for (var t = 0; t < this.events.length; t++)
              this.events[t].tick += e;
            (this.nextTick += e), (this.paused = !1), (this._codePaused = !1);
          }
        },
        _resume: function () {
          this._codePaused || this.resume();
        },
        removeAll: function () {
          this.onComplete.removeAll(),
            (this.events.length = 0),
            (this._len = 0),
            (this._i = 0);
        },
        destroy: function () {
          this.onComplete.removeAll(),
            (this.running = !1),
            (this.events = []),
            (this._len = 0),
            (this._i = 0);
        },
      }),
      Object.defineProperty(t.Timer.prototype, "next", {
        get: function () {
          return this.nextTick;
        },
      }),
      Object.defineProperty(t.Timer.prototype, "duration", {
        get: function () {
          return this.running && this.nextTick > this._now
            ? this.nextTick - this._now
            : 0;
        },
      }),
      Object.defineProperty(t.Timer.prototype, "length", {
        get: function () {
          return this.events.length;
        },
      }),
      Object.defineProperty(t.Timer.prototype, "ms", {
        get: function () {
          return this._now - this._started - this._pauseTotal;
        },
      }),
      Object.defineProperty(t.Timer.prototype, "seconds", {
        get: function () {
          return 0.001 * this.ms;
        },
      }),
      (t.Timer.prototype.constructor = t.Timer),
      (t.TimerEvent = function (e, t, n, r, i, s, o, u) {
        (this.timer = e),
          (this.delay = t),
          (this.tick = n),
          (this.repeatCount = r - 1),
          (this.loop = i),
          (this.callback = s),
          (this.callbackContext = o),
          (this.args = u),
          (this.pendingDelete = !1);
      }),
      (t.TimerEvent.prototype.constructor = t.TimerEvent),
      (t.AnimationManager = function (e) {
        (this.sprite = e),
          (this.game = e.game),
          (this.currentFrame = null),
          (this.updateIfVisible = !0),
          (this.isLoaded = !1),
          (this._frameData = null),
          (this._anims = {}),
          (this._outputFrames = []);
      }),
      (t.AnimationManager.prototype = {
        loadFrameData: function (e) {
          (this._frameData = e), (this.frame = 0), (this.isLoaded = !0);
        },
        add: function (e, n, r, i, s) {
          return null == this._frameData
            ? void console.warn(
                "No FrameData available for Phaser.Animation " + e
              )
            : ((n = n || []),
              (r = r || 60),
              "undefined" == typeof i && (i = !1),
              "undefined" == typeof s &&
                (s = n && "number" == typeof n[0] ? !0 : !1),
              null == this.sprite.events.onAnimationStart &&
                ((this.sprite.events.onAnimationStart = new t.Signal()),
                (this.sprite.events.onAnimationComplete = new t.Signal()),
                (this.sprite.events.onAnimationLoop = new t.Signal())),
              (this._outputFrames.length = 0),
              this._frameData.getFrameIndexes(n, s, this._outputFrames),
              (this._anims[e] = new t.Animation(
                this.game,
                this.sprite,
                e,
                this._frameData,
                this._outputFrames,
                r,
                i
              )),
              (this.currentAnim = this._anims[e]),
              (this.currentFrame = this.currentAnim.currentFrame),
              this.sprite.setTexture(PIXI.TextureCache[this.currentFrame.uuid]),
              this.sprite.__tilePattern &&
                ((this.__tilePattern = !1), (this.tilingTexture = !1)),
              this._anims[e]);
        },
        validateFrames: function (e, t) {
          "undefined" == typeof t && (t = !0);
          for (var n = 0; n < e.length; n++)
            if (t === !0) {
              if (e[n] > this._frameData.total) return !1;
            } else if (this._frameData.checkFrameName(e[n]) === !1) return !1;
          return !0;
        },
        play: function (e, t, n, r) {
          if (this._anims[e]) {
            if (this.currentAnim != this._anims[e])
              return (
                (this.currentAnim = this._anims[e]),
                (this.currentAnim.paused = !1),
                this.currentAnim.play(t, n, r)
              );
            if (this.currentAnim.isPlaying === !1)
              return (
                (this.currentAnim.paused = !1), this.currentAnim.play(t, n, r)
              );
          }
        },
        stop: function (e, t) {
          "undefined" == typeof t && (t = !1),
            "string" == typeof e
              ? this._anims[e] &&
                ((this.currentAnim = this._anims[e]), this.currentAnim.stop(t))
              : this.currentAnim && this.currentAnim.stop(t);
        },
        update: function () {
          return this.updateIfVisible && !this.sprite.visible
            ? !1
            : this.currentAnim && this.currentAnim.update() === !0
            ? ((this.currentFrame = this.currentAnim.currentFrame), !0)
            : !1;
        },
        getAnimation: function (e) {
          return "string" == typeof e && this._anims[e] ? this._anims[e] : null;
        },
        refreshFrame: function () {
          this.sprite.setTexture(PIXI.TextureCache[this.currentFrame.uuid]),
            this.sprite.__tilePattern &&
              ((this.__tilePattern = !1), (this.tilingTexture = !1));
        },
        destroy: function () {
          (this._anims = {}),
            (this._frameData = null),
            (this._frameIndex = 0),
            (this.currentAnim = null),
            (this.currentFrame = null);
        },
      }),
      (t.AnimationManager.prototype.constructor = t.AnimationManager),
      Object.defineProperty(t.AnimationManager.prototype, "frameData", {
        get: function () {
          return this._frameData;
        },
      }),
      Object.defineProperty(t.AnimationManager.prototype, "frameTotal", {
        get: function () {
          return this._frameData ? this._frameData.total : -1;
        },
      }),
      Object.defineProperty(t.AnimationManager.prototype, "paused", {
        get: function () {
          return this.currentAnim.isPaused;
        },
        set: function (e) {
          this.currentAnim.paused = e;
        },
      }),
      Object.defineProperty(t.AnimationManager.prototype, "frame", {
        get: function () {
          return this.currentFrame ? this._frameIndex : void 0;
        },
        set: function (e) {
          "number" == typeof e &&
            this._frameData &&
            null !== this._frameData.getFrame(e) &&
            ((this.currentFrame = this._frameData.getFrame(e)),
            this.currentFrame &&
              ((this._frameIndex = e),
              this.sprite.setTexture(PIXI.TextureCache[this.currentFrame.uuid]),
              this.sprite.__tilePattern &&
                ((this.__tilePattern = !1), (this.tilingTexture = !1))));
        },
      }),
      Object.defineProperty(t.AnimationManager.prototype, "frameName", {
        get: function () {
          return this.currentFrame ? this.currentFrame.name : void 0;
        },
        set: function (e) {
          "string" == typeof e &&
          this._frameData &&
          null !== this._frameData.getFrameByName(e)
            ? ((this.currentFrame = this._frameData.getFrameByName(e)),
              this.currentFrame &&
                ((this._frameIndex = this.currentFrame.index),
                this.sprite.setTexture(
                  PIXI.TextureCache[this.currentFrame.uuid]
                ),
                this.sprite.__tilePattern &&
                  ((this.__tilePattern = !1), (this.tilingTexture = !1))))
            : console.warn("Cannot set frameName: " + e);
        },
      }),
      (t.Animation = function (e, n, r, i, s, o, u) {
        (this.game = e),
          (this._parent = n),
          (this._frameData = i),
          (this.name = r),
          (this._frames = []),
          (this._frames = this._frames.concat(s)),
          (this.delay = 1e3 / o),
          (this.loop = u),
          (this.loopCount = 0),
          (this.killOnComplete = !1),
          (this.isFinished = !1),
          (this.isPlaying = !1),
          (this.isPaused = !1),
          (this._pauseStartTime = 0),
          (this._frameIndex = 0),
          (this._frameDiff = 0),
          (this._frameSkip = 1),
          (this.currentFrame = this._frameData.getFrame(
            this._frames[this._frameIndex]
          )),
          (this.onStart = new t.Signal()),
          (this.onComplete = new t.Signal()),
          (this.onLoop = new t.Signal()),
          this.game.onPause.add(this.onPause, this),
          this.game.onResume.add(this.onResume, this);
      }),
      (t.Animation.prototype = {
        play: function (e, t, n) {
          return (
            "number" == typeof e && (this.delay = 1e3 / e),
            "boolean" == typeof t && (this.loop = t),
            "undefined" != typeof n && (this.killOnComplete = n),
            (this.isPlaying = !0),
            (this.isFinished = !1),
            (this.paused = !1),
            (this.loopCount = 0),
            (this._timeLastFrame = this.game.time.now),
            (this._timeNextFrame = this.game.time.now + this.delay),
            (this._frameIndex = 0),
            (this.currentFrame = this._frameData.getFrame(
              this._frames[this._frameIndex]
            )),
            this._parent.setTexture(PIXI.TextureCache[this.currentFrame.uuid]),
            this._parent.__tilePattern &&
              ((this._parent.__tilePattern = !1),
              (this._parent.tilingTexture = !1)),
            this._parent.events.onAnimationStart.dispatch(this._parent, this),
            this.onStart.dispatch(this._parent, this),
            this
          );
        },
        restart: function () {
          (this.isPlaying = !0),
            (this.isFinished = !1),
            (this.paused = !1),
            (this.loopCount = 0),
            (this._timeLastFrame = this.game.time.now),
            (this._timeNextFrame = this.game.time.now + this.delay),
            (this._frameIndex = 0),
            (this.currentFrame = this._frameData.getFrame(
              this._frames[this._frameIndex]
            )),
            this.onStart.dispatch(this._parent, this);
        },
        stop: function (e, t) {
          "undefined" == typeof e && (e = !1),
            "undefined" == typeof t && (t = !1),
            (this.isPlaying = !1),
            (this.isFinished = !0),
            (this.paused = !1),
            e &&
              (this.currentFrame = this._frameData.getFrame(this._frames[0])),
            t &&
              (this._parent.events.onAnimationComplete.dispatch(
                this._parent,
                this
              ),
              this.onComplete.dispatch(this._parent, this));
        },
        onPause: function () {
          this.isPlaying &&
            (this._frameDiff = this._timeNextFrame - this.game.time.now);
        },
        onResume: function () {
          this.isPlaying &&
            (this._timeNextFrame = this.game.time.now + this._frameDiff);
        },
        update: function () {
          return this.isPaused
            ? !1
            : this.isPlaying === !0 && this.game.time.now >= this._timeNextFrame
            ? ((this._frameSkip = 1),
              (this._frameDiff = this.game.time.now - this._timeNextFrame),
              (this._timeLastFrame = this.game.time.now),
              this._frameDiff > this.delay &&
                ((this._frameSkip = Math.floor(this._frameDiff / this.delay)),
                (this._frameDiff -= this._frameSkip * this.delay)),
              (this._timeNextFrame =
                this.game.time.now + (this.delay - this._frameDiff)),
              (this._frameIndex += this._frameSkip),
              this._frameIndex >= this._frames.length
                ? this.loop
                  ? ((this._frameIndex %= this._frames.length),
                    (this.currentFrame = this._frameData.getFrame(
                      this._frames[this._frameIndex]
                    )),
                    this.currentFrame &&
                      (this._parent.setTexture(
                        PIXI.TextureCache[this.currentFrame.uuid]
                      ),
                      this._parent.__tilePattern &&
                        ((this._parent.__tilePattern = !1),
                        (this._parent.tilingTexture = !1))),
                    this.loopCount++,
                    this._parent.events.onAnimationLoop.dispatch(
                      this._parent,
                      this
                    ),
                    this.onLoop.dispatch(this._parent, this))
                  : this.complete()
                : ((this.currentFrame = this._frameData.getFrame(
                    this._frames[this._frameIndex]
                  )),
                  this.currentFrame &&
                    (this._parent.setTexture(
                      PIXI.TextureCache[this.currentFrame.uuid]
                    ),
                    this._parent.__tilePattern &&
                      ((this._parent.__tilePattern = !1),
                      (this._parent.tilingTexture = !1)))),
              !0)
            : !1;
        },
        destroy: function () {
          (this.game = null),
            (this._parent = null),
            (this._frames = null),
            (this._frameData = null),
            (this.currentFrame = null),
            (this.isPlaying = !1),
            this.onStart.destroy(),
            this.onLoop.destroy(),
            this.onComplete.destroy(),
            this.game.onPause.remove(this.onPause, this),
            this.game.onResume.remove(this.onResume, this);
        },
        complete: function () {
          (this.isPlaying = !1),
            (this.isFinished = !0),
            (this.paused = !1),
            this._parent.events.onAnimationComplete.dispatch(
              this._parent,
              this
            ),
            this.onComplete.dispatch(this._parent, this),
            this.killOnComplete && this._parent.kill();
        },
      }),
      (t.Animation.prototype.constructor = t.Animation),
      Object.defineProperty(t.Animation.prototype, "paused", {
        get: function () {
          return this.isPaused;
        },
        set: function (e) {
          (this.isPaused = e),
            e
              ? (this._pauseStartTime = this.game.time.now)
              : this.isPlaying &&
                (this._timeNextFrame = this.game.time.now + this.delay);
        },
      }),
      Object.defineProperty(t.Animation.prototype, "frameTotal", {
        get: function () {
          return this._frames.length;
        },
      }),
      Object.defineProperty(t.Animation.prototype, "frame", {
        get: function () {
          return null !== this.currentFrame
            ? this.currentFrame.index
            : this._frameIndex;
        },
        set: function (e) {
          (this.currentFrame = this._frameData.getFrame(this._frames[e])),
            null !== this.currentFrame &&
              ((this._frameIndex = e),
              this._parent.setTexture(
                PIXI.TextureCache[this.currentFrame.uuid]
              ));
        },
      }),
      Object.defineProperty(t.Animation.prototype, "speed", {
        get: function () {
          return Math.round(1e3 / this.delay);
        },
        set: function (e) {
          e >= 1 && (this.delay = 1e3 / e);
        },
      }),
      (t.Animation.generateFrameNames = function (e, n, r, i, s) {
        "undefined" == typeof i && (i = "");
        var o = [],
          u = "";
        if (r > n)
          for (var a = n; r >= a; a++)
            (u =
              "number" == typeof s
                ? t.Utils.pad(a.toString(), s, "0", 1)
                : a.toString()),
              (u = e + u + i),
              o.push(u);
        else
          for (var a = n; a >= r; a--)
            (u =
              "number" == typeof s
                ? t.Utils.pad(a.toString(), s, "0", 1)
                : a.toString()),
              (u = e + u + i),
              o.push(u);
        return o;
      }),
      (t.Frame = function (e, n, r, i, s, o, u) {
        (this.index = e),
          (this.x = n),
          (this.y = r),
          (this.width = i),
          (this.height = s),
          (this.name = o),
          (this.uuid = u),
          (this.centerX = Math.floor(i / 2)),
          (this.centerY = Math.floor(s / 2)),
          (this.distance = t.Math.distance(0, 0, i, s)),
          (this.rotated = !1),
          (this.rotationDirection = "cw"),
          (this.trimmed = !1),
          (this.sourceSizeW = i),
          (this.sourceSizeH = s),
          (this.spriteSourceSizeX = 0),
          (this.spriteSourceSizeY = 0),
          (this.spriteSourceSizeW = 0),
          (this.spriteSourceSizeH = 0);
      }),
      (t.Frame.prototype = {
        setTrim: function (e, t, n, r, i, s, o) {
          (this.trimmed = e),
            e &&
              ((this.width = t),
              (this.height = n),
              (this.sourceSizeW = t),
              (this.sourceSizeH = n),
              (this.centerX = Math.floor(t / 2)),
              (this.centerY = Math.floor(n / 2)),
              (this.spriteSourceSizeX = r),
              (this.spriteSourceSizeY = i),
              (this.spriteSourceSizeW = s),
              (this.spriteSourceSizeH = o));
        },
        getRect: function (e) {
          return (
            "undefined" == typeof e
              ? (e = new t.Rectangle(this.x, this.y, this.width, this.height))
              : e.setTo(this.x, this.y, this.width, this.height),
            e
          );
        },
      }),
      (t.Frame.prototype.constructor = t.Frame),
      (t.FrameData = function () {
        (this._frames = []), (this._frameNames = []);
      }),
      (t.FrameData.prototype = {
        addFrame: function (e) {
          return (
            (e.index = this._frames.length),
            this._frames.push(e),
            "" !== e.name && (this._frameNames[e.name] = e.index),
            e
          );
        },
        getFrame: function (e) {
          return e > this._frames.length && (e = 0), this._frames[e];
        },
        getFrameByName: function (e) {
          return "number" == typeof this._frameNames[e]
            ? this._frames[this._frameNames[e]]
            : null;
        },
        checkFrameName: function (e) {
          return null == this._frameNames[e] ? !1 : !0;
        },
        getFrameRange: function (e, t, n) {
          "undefined" == typeof n && (n = []);
          for (var r = e; t >= r; r++) n.push(this._frames[r]);
          return n;
        },
        getFrames: function (e, t, n) {
          if (
            ("undefined" == typeof t && (t = !0),
            "undefined" == typeof n && (n = []),
            "undefined" == typeof e || 0 === e.length)
          )
            for (var r = 0; r < this._frames.length; r++)
              n.push(this._frames[r]);
          else
            for (var r = 0, i = e.length; i > r; r++)
              n.push(t ? this.getFrame(e[r]) : this.getFrameByName(e[r]));
          return n;
        },
        getFrameIndexes: function (e, t, n) {
          if (
            ("undefined" == typeof t && (t = !0),
            "undefined" == typeof n && (n = []),
            "undefined" == typeof e || 0 === e.length)
          )
            for (var r = 0, i = this._frames.length; i > r; r++)
              n.push(this._frames[r].index);
          else
            for (var r = 0, i = e.length; i > r; r++)
              t
                ? n.push(e[r])
                : this.getFrameByName(e[r]) &&
                  n.push(this.getFrameByName(e[r]).index);
          return n;
        },
      }),
      (t.FrameData.prototype.constructor = t.FrameData),
      Object.defineProperty(t.FrameData.prototype, "total", {
        get: function () {
          return this._frames.length;
        },
      }),
      (t.AnimationParser = {
        spriteSheet: function (e, n, r, i, s, o, u) {
          var a = e.cache.getImage(n);
          if (null == a) return null;
          var f = a.width,
            l = a.height;
          0 >= r && (r = Math.floor(-f / Math.min(-1, r))),
            0 >= i && (i = Math.floor(-l / Math.min(-1, i)));
          var c = Math.floor((f - o) / (r + u)),
            h = Math.floor((l - o) / (i + u)),
            p = c * h;
          if (
            (-1 !== s && (p = s),
            0 === f || 0 === l || r > f || i > l || 0 === p)
          )
            return (
              console.warn(
                "Phaser.AnimationParser.spriteSheet: width/height zero or width/height < given frameWidth/frameHeight"
              ),
              null
            );
          for (var d = new t.FrameData(), v = o, m = o, g = 0; p > g; g++) {
            var y = e.rnd.uuid();
            d.addFrame(new t.Frame(g, v, m, r, i, "", y)),
              (PIXI.TextureCache[y] = new PIXI.Texture(
                PIXI.BaseTextureCache[n],
                { x: v, y: m, width: r, height: i }
              )),
              (v += r + u),
              v + r > f && ((v = o), (m += i + u));
          }
          return d;
        },
        JSONData: function (e, n, r) {
          if (!n.frames)
            return (
              console.warn(
                "Phaser.AnimationParser.JSONData: Invalid Texture Atlas JSON given, missing 'frames' array"
              ),
              void console.log(n)
            );
          for (
            var i, s = new t.FrameData(), o = n.frames, u = 0;
            u < o.length;
            u++
          ) {
            var a = e.rnd.uuid();
            (i = s.addFrame(
              new t.Frame(
                u,
                o[u].frame.x,
                o[u].frame.y,
                o[u].frame.w,
                o[u].frame.h,
                o[u].filename,
                a
              )
            )),
              (PIXI.TextureCache[a] = new PIXI.Texture(
                PIXI.BaseTextureCache[r],
                {
                  x: o[u].frame.x,
                  y: o[u].frame.y,
                  width: o[u].frame.w,
                  height: o[u].frame.h,
                }
              )),
              o[u].trimmed &&
                (i.setTrim(
                  o[u].trimmed,
                  o[u].sourceSize.w,
                  o[u].sourceSize.h,
                  o[u].spriteSourceSize.x,
                  o[u].spriteSourceSize.y,
                  o[u].spriteSourceSize.w,
                  o[u].spriteSourceSize.h
                ),
                (PIXI.TextureCache[a].trim = new t.Rectangle(
                  o[u].spriteSourceSize.x,
                  o[u].spriteSourceSize.y,
                  o[u].sourceSize.w,
                  o[u].sourceSize.h
                )));
          }
          return s;
        },
        JSONDataHash: function (e, n, r) {
          if (!n.frames)
            return (
              console.warn(
                "Phaser.AnimationParser.JSONDataHash: Invalid Texture Atlas JSON given, missing 'frames' object"
              ),
              void console.log(n)
            );
          var i,
            s = new t.FrameData(),
            o = n.frames,
            u = 0;
          for (var a in o) {
            var f = e.rnd.uuid();
            (i = s.addFrame(
              new t.Frame(
                u,
                o[a].frame.x,
                o[a].frame.y,
                o[a].frame.w,
                o[a].frame.h,
                a,
                f
              )
            )),
              (PIXI.TextureCache[f] = new PIXI.Texture(
                PIXI.BaseTextureCache[r],
                {
                  x: o[a].frame.x,
                  y: o[a].frame.y,
                  width: o[a].frame.w,
                  height: o[a].frame.h,
                }
              )),
              o[a].trimmed &&
                (i.setTrim(
                  o[a].trimmed,
                  o[a].sourceSize.w,
                  o[a].sourceSize.h,
                  o[a].spriteSourceSize.x,
                  o[a].spriteSourceSize.y,
                  o[a].spriteSourceSize.w,
                  o[a].spriteSourceSize.h
                ),
                (PIXI.TextureCache[f].trim = new t.Rectangle(
                  o[a].spriteSourceSize.x,
                  o[a].spriteSourceSize.y,
                  o[a].sourceSize.w,
                  o[a].sourceSize.h
                ))),
              u++;
          }
          return s;
        },
        XMLData: function (e, n, r) {
          if (!n.getElementsByTagName("TextureAtlas"))
            return void console.warn(
              "Phaser.AnimationParser.XMLData: Invalid Texture Atlas XML given, missing <TextureAtlas> tag"
            );
          for (
            var i,
              s,
              o,
              u,
              a,
              f,
              l,
              c,
              h,
              p,
              d,
              v,
              m = new t.FrameData(),
              g = n.getElementsByTagName("SubTexture"),
              y = 0;
            y < g.length;
            y++
          )
            (s = e.rnd.uuid()),
              (u = g[y].attributes),
              (o = u.name.nodeValue),
              (a = parseInt(u.x.nodeValue, 10)),
              (f = parseInt(u.y.nodeValue, 10)),
              (l = parseInt(u.width.nodeValue, 10)),
              (c = parseInt(u.height.nodeValue, 10)),
              (h = null),
              (p = null),
              u.frameX &&
                ((h = Math.abs(parseInt(u.frameX.nodeValue, 10))),
                (p = Math.abs(parseInt(u.frameY.nodeValue, 10))),
                (d = parseInt(u.frameWidth.nodeValue, 10)),
                (v = parseInt(u.frameHeight.nodeValue, 10))),
              (i = m.addFrame(new t.Frame(y, a, f, l, c, o, s))),
              (PIXI.TextureCache[s] = new PIXI.Texture(
                PIXI.BaseTextureCache[r],
                { x: a, y: f, width: l, height: c }
              )),
              (null !== h || null !== p) &&
                (i.setTrim(!0, l, c, h, p, d, v),
                (PIXI.TextureCache[s].trim = new t.Rectangle(h, p, l, c)));
          return m;
        },
      }),
      (t.Cache = function (e) {
        (this.game = e),
          (this._canvases = {}),
          (this._images = {}),
          (this._textures = {}),
          (this._sounds = {}),
          (this._text = {}),
          (this._json = {}),
          (this._physics = {}),
          (this._tilemaps = {}),
          (this._binary = {}),
          (this._bitmapDatas = {}),
          (this._bitmapFont = {}),
          this.addDefaultImage(),
          this.addMissingImage(),
          (this.onSoundUnlock = new t.Signal());
      }),
      (t.Cache.CANVAS = 1),
      (t.Cache.IMAGE = 2),
      (t.Cache.TEXTURE = 3),
      (t.Cache.SOUND = 4),
      (t.Cache.TEXT = 5),
      (t.Cache.PHYSICS = 6),
      (t.Cache.TILEMAP = 7),
      (t.Cache.BINARY = 8),
      (t.Cache.BITMAPDATA = 9),
      (t.Cache.BITMAPFONT = 10),
      (t.Cache.JSON = 11),
      (t.Cache.prototype = {
        addCanvas: function (e, t, n) {
          this._canvases[e] = { canvas: t, context: n };
        },
        addBinary: function (e, t) {
          this._binary[e] = t;
        },
        addBitmapData: function (e, t) {
          return (this._bitmapDatas[e] = t), t;
        },
        addRenderTexture: function (e, n) {
          var r = new t.Frame(0, 0, 0, n.width, n.height, "", "");
          this._textures[e] = { texture: n, frame: r };
        },
        addSpriteSheet: function (e, n, r, i, s, o, u, a) {
          (this._images[e] = {
            url: n,
            data: r,
            spriteSheet: !0,
            frameWidth: i,
            frameHeight: s,
            margin: u,
            spacing: a,
          }),
            (PIXI.BaseTextureCache[e] = new PIXI.BaseTexture(r)),
            (PIXI.TextureCache[e] = new PIXI.Texture(PIXI.BaseTextureCache[e])),
            (this._images[e].frameData = t.AnimationParser.spriteSheet(
              this.game,
              e,
              i,
              s,
              o,
              u,
              a
            ));
        },
        addTilemap: function (e, t, n, r) {
          this._tilemaps[e] = { url: t, data: n, format: r };
        },
        addTextureAtlas: function (e, n, r, i, s) {
          (this._images[e] = { url: n, data: r, spriteSheet: !0 }),
            (PIXI.BaseTextureCache[e] = new PIXI.BaseTexture(r)),
            (PIXI.TextureCache[e] = new PIXI.Texture(PIXI.BaseTextureCache[e])),
            s == t.Loader.TEXTURE_ATLAS_JSON_ARRAY
              ? (this._images[e].frameData = t.AnimationParser.JSONData(
                  this.game,
                  i,
                  e
                ))
              : s == t.Loader.TEXTURE_ATLAS_JSON_HASH
              ? (this._images[e].frameData = t.AnimationParser.JSONDataHash(
                  this.game,
                  i,
                  e
                ))
              : s == t.Loader.TEXTURE_ATLAS_XML_STARLING &&
                (this._images[e].frameData = t.AnimationParser.XMLData(
                  this.game,
                  i,
                  e
                ));
        },
        addBitmapFont: function (e, n, r, i, s, o) {
          (this._images[e] = { url: n, data: r, spriteSheet: !0 }),
            (PIXI.BaseTextureCache[e] = new PIXI.BaseTexture(r)),
            (PIXI.TextureCache[e] = new PIXI.Texture(PIXI.BaseTextureCache[e])),
            t.LoaderParser.bitmapFont(this.game, i, e, s, o);
        },
        addPhysicsData: function (e, t, n, r) {
          this._physics[e] = { url: t, data: n, format: r };
        },
        addDefaultImage: function () {
          var e = new Image();
          (e.src =
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgAQMAAABJtOi3AAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAABVJREFUeF7NwIEAAAAAgKD9qdeocAMAoAABm3DkcAAAAABJRU5ErkJggg=="),
            (this._images.__default = { url: null, data: e, spriteSheet: !1 }),
            (this._images.__default.frame = new t.Frame(
              0,
              0,
              0,
              32,
              32,
              "",
              ""
            )),
            (PIXI.BaseTextureCache.__default = new PIXI.BaseTexture(e)),
            (PIXI.TextureCache.__default = new PIXI.Texture(
              PIXI.BaseTextureCache.__default
            ));
        },
        addMissingImage: function () {
          var e = new Image();
          (e.src =
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJ9JREFUeNq01ssOwyAMRFG46v//Mt1ESmgh+DFmE2GPOBARKb2NVjo+17PXLD8a1+pl5+A+wSgFygymWYHBb0FtsKhJDdZlncG2IzJ4ayoMDv20wTmSMzClEgbWYNTAkQ0Z+OJ+A/eWnAaR9+oxCF4Os0H8htsMUp+pwcgBBiMNnAwF8GqIgL2hAzaGFFgZauDPKABmowZ4GL369/0rwACp2yA/ttmvsQAAAABJRU5ErkJggg=="),
            (this._images.__missing = { url: null, data: e, spriteSheet: !1 }),
            (this._images.__missing.frame = new t.Frame(
              0,
              0,
              0,
              32,
              32,
              "",
              ""
            )),
            (PIXI.BaseTextureCache.__missing = new PIXI.BaseTexture(e)),
            (PIXI.TextureCache.__missing = new PIXI.Texture(
              PIXI.BaseTextureCache.__missing
            ));
        },
        addText: function (e, t, n) {
          this._text[e] = { url: t, data: n };
        },
        addJSON: function (e, t, n) {
          this._json[e] = { url: t, data: n };
        },
        addImage: function (e, n, r) {
          (this._images[e] = { url: n, data: r, spriteSheet: !1 }),
            (this._images[e].frame = new t.Frame(
              0,
              0,
              0,
              r.width,
              r.height,
              e,
              this.game.rnd.uuid()
            )),
            (PIXI.BaseTextureCache[e] = new PIXI.BaseTexture(r)),
            (PIXI.TextureCache[e] = new PIXI.Texture(PIXI.BaseTextureCache[e]));
        },
        addSound: function (e, t, n, r, i) {
          (r = r || !0), (i = i || !1);
          var s = !1;
          i && (s = !0),
            (this._sounds[e] = {
              url: t,
              data: n,
              isDecoding: !1,
              decoded: s,
              webAudio: r,
              audioTag: i,
              locked: this.game.sound.touchLocked,
            });
        },
        reloadSound: function (e) {
          var t = this;
          this._sounds[e] &&
            ((this._sounds[e].data.src = this._sounds[e].url),
            this._sounds[e].data.addEventListener(
              "canplaythrough",
              function () {
                return t.reloadSoundComplete(e);
              },
              !1
            ),
            this._sounds[e].data.load());
        },
        reloadSoundComplete: function (e) {
          this._sounds[e] &&
            ((this._sounds[e].locked = !1), this.onSoundUnlock.dispatch(e));
        },
        updateSound: function (e, t, n) {
          this._sounds[e] && (this._sounds[e][t] = n);
        },
        decodedSound: function (e, t) {
          (this._sounds[e].data = t),
            (this._sounds[e].decoded = !0),
            (this._sounds[e].isDecoding = !1);
        },
        getCanvas: function (e) {
          return this._canvases[e]
            ? this._canvases[e].canvas
            : void console.warn(
                'Phaser.Cache.getCanvas: Invalid key: "' + e + '"'
              );
        },
        getBitmapData: function (e) {
          return this._bitmapDatas[e]
            ? this._bitmapDatas[e]
            : void console.warn(
                'Phaser.Cache.getBitmapData: Invalid key: "' + e + '"'
              );
        },
        getBitmapFont: function (e) {
          return this._bitmapFont[e]
            ? this._bitmapFont[e]
            : void console.warn(
                'Phaser.Cache.getBitmapFont: Invalid key: "' + e + '"'
              );
        },
        getPhysicsData: function (e, t) {
          if ("undefined" == typeof t || null === t) {
            if (this._physics[e]) return this._physics[e].data;
            console.warn(
              'Phaser.Cache.getPhysicsData: Invalid key: "' + e + '"'
            );
          } else {
            if (this._physics[e] && this._physics[e].data[t])
              return this._physics[e].data[t];
            console.warn(
              'Phaser.Cache.getPhysicsData: Invalid key/object: "' +
                e +
                " / " +
                t +
                '"'
            );
          }
          return null;
        },
        checkImageKey: function (e) {
          return this._images[e] ? !0 : !1;
        },
        getImage: function (e) {
          return this._images[e]
            ? this._images[e].data
            : void console.warn(
                'Phaser.Cache.getImage: Invalid key: "' + e + '"'
              );
        },
        getTilemapData: function (e) {
          return this._tilemaps[e]
            ? this._tilemaps[e]
            : void console.warn(
                'Phaser.Cache.getTilemapData: Invalid key: "' + e + '"'
              );
        },
        getFrameData: function (e) {
          return this._images[e] && this._images[e].frameData
            ? this._images[e].frameData
            : null;
        },
        updateFrameData: function (e, t) {
          this._images[e] &&
            ((this._images[e].spriteSheet = !0),
            (this._images[e].frameData = t));
        },
        getFrameByIndex: function (e, t) {
          return this._images[e] && this._images[e].frameData
            ? this._images[e].frameData.getFrame(t)
            : null;
        },
        getFrameByName: function (e, t) {
          return this._images[e] && this._images[e].frameData
            ? this._images[e].frameData.getFrameByName(t)
            : null;
        },
        getFrame: function (e) {
          return this._images[e] && this._images[e].spriteSheet === !1
            ? this._images[e].frame
            : null;
        },
        getTextureFrame: function (e) {
          return this._textures[e] ? this._textures[e].frame : null;
        },
        getTexture: function (e) {
          return this._textures[e]
            ? this._textures[e]
            : void console.warn(
                'Phaser.Cache.getTexture: Invalid key: "' + e + '"'
              );
        },
        getSound: function (e) {
          return this._sounds[e]
            ? this._sounds[e]
            : void console.warn(
                'Phaser.Cache.getSound: Invalid key: "' + e + '"'
              );
        },
        getSoundData: function (e) {
          return this._sounds[e]
            ? this._sounds[e].data
            : void console.warn(
                'Phaser.Cache.getSoundData: Invalid key: "' + e + '"'
              );
        },
        isSoundDecoded: function (e) {
          return this._sounds[e] ? this._sounds[e].decoded : void 0;
        },
        isSoundReady: function (e) {
          return (
            this._sounds[e] &&
            this._sounds[e].decoded &&
            this.game.sound.touchLocked === !1
          );
        },
        isSpriteSheet: function (e) {
          return this._images[e] ? this._images[e].spriteSheet : !1;
        },
        getText: function (e) {
          return this._text[e]
            ? this._text[e].data
            : void console.warn(
                'Phaser.Cache.getText: Invalid key: "' + e + '"'
              );
        },
        getJSON: function (e) {
          return this._json[e]
            ? this._json[e].data
            : void console.warn(
                'Phaser.Cache.getJSON: Invalid key: "' + e + '"'
              );
        },
        getBinary: function (e) {
          return this._binary[e]
            ? this._binary[e]
            : void console.warn(
                'Phaser.Cache.getBinary: Invalid key: "' + e + '"'
              );
        },
        getKeys: function (e) {
          var n = null;
          switch (e) {
            case t.Cache.CANVAS:
              n = this._canvases;
              break;
            case t.Cache.IMAGE:
              n = this._images;
              break;
            case t.Cache.TEXTURE:
              n = this._textures;
              break;
            case t.Cache.SOUND:
              n = this._sounds;
              break;
            case t.Cache.TEXT:
              n = this._text;
              break;
            case t.Cache.PHYSICS:
              n = this._physics;
              break;
            case t.Cache.TILEMAP:
              n = this._tilemaps;
              break;
            case t.Cache.BINARY:
              n = this._binary;
              break;
            case t.Cache.BITMAPDATA:
              n = this._bitmapDatas;
              break;
            case t.Cache.BITMAPFONT:
              n = this._bitmapFont;
              break;
            case t.Cache.JSON:
              n = this._json;
          }
          if (n) {
            var r = [];
            for (var i in n)
              "__default" !== i && "__missing" !== i && r.push(i);
            return r;
          }
        },
        removeCanvas: function (e) {
          delete this._canvases[e];
        },
        removeImage: function (e) {
          delete this._images[e];
        },
        removeSound: function (e) {
          delete this._sounds[e];
        },
        removeText: function (e) {
          delete this._text[e];
        },
        removeJSON: function (e) {
          delete this._json[e];
        },
        removePhysics: function (e) {
          delete this._physics[e];
        },
        removeTilemap: function (e) {
          delete this._tilemaps[e];
        },
        removeBinary: function (e) {
          delete this._binary[e];
        },
        removeBitmapData: function (e) {
          delete this._bitmapDatas[e];
        },
        removeBitmapFont: function (e) {
          delete this._bitmapFont[e];
        },
        destroy: function () {
          for (var e in this._canvases) delete this._canvases[e];
          for (var e in this._images)
            "__default" !== e && "__missing" !== e && delete this._images[e];
          for (var e in this._sounds) delete this._sounds[e];
          for (var e in this._text) delete this._text[e];
          for (var e in this._json) delete this._json[e];
          for (var e in this._textures) delete this._textures[e];
          for (var e in this._physics) delete this._physics[e];
          for (var e in this._tilemaps) delete this._tilemaps[e];
          for (var e in this._binary) delete this._binary[e];
          for (var e in this._bitmapDatas) delete this._bitmapDatas[e];
          for (var e in this._bitmapFont) delete this._bitmapFont[e];
        },
      }),
      (t.Cache.prototype.constructor = t.Cache),
      (t.Loader = function (e) {
        (this.game = e),
          (this._fileList = []),
          (this._fileIndex = 0),
          (this._progressChunk = 0),
          (this._xhr = new XMLHttpRequest()),
          (this.isLoading = !1),
          (this.hasLoaded = !1),
          (this.progress = 0),
          (this.progressFloat = 0),
          (this.preloadSprite = null),
          (this.crossOrigin = !1),
          (this.baseURL = ""),
          (this.onFileComplete = new t.Signal()),
          (this.onFileError = new t.Signal()),
          (this.onLoadStart = new t.Signal()),
          (this.onLoadComplete = new t.Signal());
      }),
      (t.Loader.TEXTURE_ATLAS_JSON_ARRAY = 0),
      (t.Loader.TEXTURE_ATLAS_JSON_HASH = 1),
      (t.Loader.TEXTURE_ATLAS_XML_STARLING = 2),
      (t.Loader.PHYSICS_LIME_CORONA = 3),
      (t.Loader.prototype = {
        setPreloadSprite: function (e, n) {
          (n = n || 0),
            (this.preloadSprite = {
              sprite: e,
              direction: n,
              width: e.width,
              height: e.height,
              rect: null,
            }),
            (this.preloadSprite.rect =
              0 === n
                ? new t.Rectangle(0, 0, 1, e.height)
                : new t.Rectangle(0, 0, e.width, 1)),
            e.crop(this.preloadSprite.rect),
            (e.visible = !0);
        },
        checkKeyExists: function (e, t) {
          if (this._fileList.length > 0)
            for (var n = 0; n < this._fileList.length; n++)
              if (this._fileList[n].type === e && this._fileList[n].key === t)
                return !0;
          return !1;
        },
        getAssetIndex: function (e, t) {
          if (this._fileList.length > 0)
            for (var n = 0; n < this._fileList.length; n++)
              if (this._fileList[n].type === e && this._fileList[n].key === t)
                return n;
          return -1;
        },
        getAsset: function (e, t) {
          if (this._fileList.length > 0)
            for (var n = 0; n < this._fileList.length; n++)
              if (this._fileList[n].type === e && this._fileList[n].key === t)
                return { index: n, file: this._fileList[n] };
          return !1;
        },
        reset: function () {
          (this.preloadSprite = null),
            (this.isLoading = !1),
            (this._fileList.length = 0),
            (this._fileIndex = 0);
        },
        addToFileList: function (e, t, n, r) {
          var i = {
            type: e,
            key: t,
            url: n,
            data: null,
            error: !1,
            loaded: !1,
          };
          if ("undefined" != typeof r) for (var s in r) i[s] = r[s];
          this.checkKeyExists(e, t) === !1 && this._fileList.push(i);
        },
        replaceInFileList: function (e, t, n, r) {
          var i = {
            type: e,
            key: t,
            url: n,
            data: null,
            error: !1,
            loaded: !1,
          };
          if ("undefined" != typeof r) for (var s in r) i[s] = r[s];
          var o = this.getAssetIndex(e, t);
          -1 === o ? this._fileList.push(i) : (this._fileList[o] = i);
        },
        image: function (e, t, n) {
          return (
            "undefined" == typeof n && (n = !1),
            n
              ? this.replaceInFileList("image", e, t)
              : this.addToFileList("image", e, t),
            this
          );
        },
        text: function (e, t, n) {
          return (
            "undefined" == typeof n && (n = !1),
            n
              ? this.replaceInFileList("text", e, t)
              : this.addToFileList("text", e, t),
            this
          );
        },
        json: function (e, t, n) {
          return (
            "undefined" == typeof n && (n = !1),
            n
              ? this.replaceInFileList("json", e, t)
              : this.addToFileList("json", e, t),
            this
          );
        },
        script: function (e, t, n, r) {
          return (
            "undefined" == typeof n && (n = !1),
            n !== !1 && "undefined" == typeof r && (r = n),
            this.addToFileList("script", e, t, {
              callback: n,
              callbackContext: r,
            }),
            this
          );
        },
        binary: function (e, t, n, r) {
          return (
            "undefined" == typeof n && (n = !1),
            n !== !1 && "undefined" == typeof r && (r = n),
            this.addToFileList("binary", e, t, {
              callback: n,
              callbackContext: r,
            }),
            this
          );
        },
        spritesheet: function (e, t, n, r, i, s, o) {
          return (
            "undefined" == typeof i && (i = -1),
            "undefined" == typeof s && (s = 0),
            "undefined" == typeof o && (o = 0),
            this.addToFileList("spritesheet", e, t, {
              frameWidth: n,
              frameHeight: r,
              frameMax: i,
              margin: s,
              spacing: o,
            }),
            this
          );
        },
        audio: function (e, t, n) {
          return (
            "undefined" == typeof n && (n = !0),
            this.addToFileList("audio", e, t, { buffer: null, autoDecode: n }),
            this
          );
        },
        tilemap: function (e, n, r, i) {
          if (
            ("undefined" == typeof n && (n = null),
            "undefined" == typeof r && (r = null),
            "undefined" == typeof i && (i = t.Tilemap.CSV),
            null == n && null == r)
          )
            return (
              console.warn(
                "Phaser.Loader.tilemap - Both mapDataURL and mapData are null. One must be set."
              ),
              this
            );
          if (r) {
            switch (i) {
              case t.Tilemap.CSV:
                break;
              case t.Tilemap.TILED_JSON:
                "string" == typeof r && (r = JSON.parse(r));
            }
            this.game.cache.addTilemap(e, null, r, i);
          } else this.addToFileList("tilemap", e, n, { format: i });
          return this;
        },
        physics: function (e, n, r, i) {
          return (
            "undefined" == typeof n && (n = null),
            "undefined" == typeof r && (r = null),
            "undefined" == typeof i && (i = t.Physics.LIME_CORONA_JSON),
            null == n && null == r
              ? (console.warn(
                  "Phaser.Loader.physics - Both dataURL and jsonData are null. One must be set."
                ),
                this)
              : (r
                  ? ("string" == typeof r && (r = JSON.parse(r)),
                    this.game.cache.addPhysicsData(e, null, r, i))
                  : this.addToFileList("physics", e, n, { format: i }),
                this)
          );
        },
        bitmapFont: function (e, t, n, r, i, s) {
          if (
            ("undefined" == typeof n && (n = null),
            "undefined" == typeof r && (r = null),
            "undefined" == typeof i && (i = 0),
            "undefined" == typeof s && (s = 0),
            n)
          )
            this.addToFileList("bitmapfont", e, t, {
              xmlURL: n,
              xSpacing: i,
              ySpacing: s,
            });
          else if ("string" == typeof r) {
            var o;
            try {
              if (window.DOMParser) {
                var u = new DOMParser();
                o = u.parseFromString(r, "text/xml");
              } else
                (o = new ActiveXObject("Microsoft.XMLDOM")),
                  (o.async = "false"),
                  o.loadXML(r);
            } catch (a) {
              o = void 0;
            }
            if (
              !o ||
              !o.documentElement ||
              o.getElementsByTagName("parsererror").length
            )
              throw new Error("Phaser.Loader. Invalid Bitmap Font XML given");
            this.addToFileList("bitmapfont", e, t, {
              xmlURL: null,
              xmlData: o,
              xSpacing: i,
              ySpacing: s,
            });
          }
          return this;
        },
        atlasJSONArray: function (e, n, r, i) {
          return this.atlas(e, n, r, i, t.Loader.TEXTURE_ATLAS_JSON_ARRAY);
        },
        atlasJSONHash: function (e, n, r, i) {
          return this.atlas(e, n, r, i, t.Loader.TEXTURE_ATLAS_JSON_HASH);
        },
        atlasXML: function (e, n, r, i) {
          return this.atlas(e, n, r, i, t.Loader.TEXTURE_ATLAS_XML_STARLING);
        },
        atlas: function (e, n, r, i, s) {
          if (
            ("undefined" == typeof r && (r = null),
            "undefined" == typeof i && (i = null),
            "undefined" == typeof s && (s = t.Loader.TEXTURE_ATLAS_JSON_ARRAY),
            r)
          )
            this.addToFileList("textureatlas", e, n, {
              atlasURL: r,
              format: s,
            });
          else {
            switch (s) {
              case t.Loader.TEXTURE_ATLAS_JSON_ARRAY:
                "string" == typeof i && (i = JSON.parse(i));
                break;
              case t.Loader.TEXTURE_ATLAS_XML_STARLING:
                if ("string" == typeof i) {
                  var o;
                  try {
                    if (window.DOMParser) {
                      var u = new DOMParser();
                      o = u.parseFromString(i, "text/xml");
                    } else
                      (o = new ActiveXObject("Microsoft.XMLDOM")),
                        (o.async = "false"),
                        o.loadXML(i);
                  } catch (a) {
                    o = void 0;
                  }
                  if (
                    !o ||
                    !o.documentElement ||
                    o.getElementsByTagName("parsererror").length
                  )
                    throw new Error(
                      "Phaser.Loader. Invalid Texture Atlas XML given"
                    );
                  i = o;
                }
            }
            this.addToFileList("textureatlas", e, n, {
              atlasURL: null,
              atlasData: i,
              format: s,
            });
          }
          return this;
        },
        removeFile: function (e, t) {
          var n = this.getAsset(e, t);
          n !== !1 && this._fileList.splice(n.index, 1);
        },
        removeAll: function () {
          this._fileList.length = 0;
        },
        start: function () {
          this.isLoading ||
            ((this.progress = 0),
            (this.progressFloat = 0),
            (this.hasLoaded = !1),
            (this.isLoading = !0),
            this.onLoadStart.dispatch(this._fileList.length),
            this._fileList.length > 0
              ? ((this._fileIndex = 0),
                (this._progressChunk = 100 / this._fileList.length),
                this.loadFile())
              : ((this.progress = 100),
                (this.progressFloat = 100),
                (this.hasLoaded = !0),
                this.onLoadComplete.dispatch()));
        },
        loadFile: function () {
          if (!this._fileList[this._fileIndex])
            return void console.warn(
              "Phaser.Loader loadFile invalid index " + this._fileIndex
            );
          var e = this._fileList[this._fileIndex],
            n = this;
          switch (e.type) {
            case "image":
            case "spritesheet":
            case "textureatlas":
            case "bitmapfont":
              (e.data = new Image()),
                (e.data.name = e.key),
                (e.data.onload = function () {
                  return n.fileComplete(n._fileIndex);
                }),
                (e.data.onerror = function () {
                  return n.fileError(n._fileIndex);
                }),
                this.crossOrigin && (e.data.crossOrigin = this.crossOrigin),
                (e.data.src = this.baseURL + e.url);
              break;
            case "audio":
              (e.url = this.getAudioURL(e.url)),
                null !== e.url
                  ? this.game.sound.usingWebAudio
                    ? (this._xhr.open("GET", this.baseURL + e.url, !0),
                      (this._xhr.responseType = "arraybuffer"),
                      (this._xhr.onload = function () {
                        return n.fileComplete(n._fileIndex);
                      }),
                      (this._xhr.onerror = function () {
                        return n.fileError(n._fileIndex);
                      }),
                      this._xhr.send())
                    : this.game.sound.usingAudioTag &&
                      (this.game.sound.touchLocked
                        ? ((e.data = new Audio()),
                          (e.data.name = e.key),
                          (e.data.preload = "auto"),
                          (e.data.src = this.baseURL + e.url),
                          this.fileComplete(this._fileIndex))
                        : ((e.data = new Audio()),
                          (e.data.name = e.key),
                          (e.data.onerror = function () {
                            return n.fileError(n._fileIndex);
                          }),
                          (e.data.preload = "auto"),
                          (e.data.src = this.baseURL + e.url),
                          e.data.addEventListener(
                            "canplaythrough",
                            t.GAMES[this.game.id].load.fileComplete(
                              this._fileIndex
                            ),
                            !1
                          ),
                          e.data.load()))
                  : this.fileError(this._fileIndex);
              break;
            case "json":
              this._xhr.open("GET", this.baseURL + e.url, !0),
                (this._xhr.responseType = "text"),
                (this._xhr.onload = function () {
                  return n.jsonLoadComplete(n._fileIndex);
                }),
                this._xhr.send();
              break;
            case "tilemap":
              if (
                (this._xhr.open("GET", this.baseURL + e.url, !0),
                (this._xhr.responseType = "text"),
                e.format === t.Tilemap.TILED_JSON)
              )
                this._xhr.onload = function () {
                  return n.jsonLoadComplete(n._fileIndex);
                };
              else {
                if (e.format !== t.Tilemap.CSV)
                  throw new Error(
                    "Phaser.Loader. Invalid Tilemap format: " + e.format
                  );
                this._xhr.onload = function () {
                  return n.csvLoadComplete(n._fileIndex);
                };
              }
              (this._xhr.onerror = function () {
                return n.dataLoadError(n._fileIndex);
              }),
                this._xhr.send();
              break;
            case "text":
            case "script":
            case "physics":
              this._xhr.open("GET", this.baseURL + e.url, !0),
                (this._xhr.responseType = "text"),
                (this._xhr.onload = function () {
                  return n.fileComplete(n._fileIndex);
                }),
                (this._xhr.onerror = function () {
                  return n.fileError(n._fileIndex);
                }),
                this._xhr.send();
              break;
            case "binary":
              this._xhr.open("GET", this.baseURL + e.url, !0),
                (this._xhr.responseType = "arraybuffer"),
                (this._xhr.onload = function () {
                  return n.fileComplete(n._fileIndex);
                }),
                (this._xhr.onerror = function () {
                  return n.fileError(n._fileIndex);
                }),
                this._xhr.send();
          }
        },
        getAudioURL: function (e) {
          var t;
          "string" == typeof e && (e = [e]);
          for (var n = 0; n < e.length; n++)
            if (
              ((t = e[n].toLowerCase()),
              (t = t.substr((Math.max(0, t.lastIndexOf(".")) || 1 / 0) + 1)),
              this.game.device.canPlayAudio(t))
            )
              return e[n];
          return null;
        },
        fileError: function (e) {
          (this._fileList[e].loaded = !0),
            (this._fileList[e].error = !0),
            this.onFileError.dispatch(this._fileList[e].key, this._fileList[e]),
            console.warn(
              "Phaser.Loader error loading file: " +
                this._fileList[e].key +
                " from URL " +
                this._fileList[e].url
            ),
            this.nextFile(e, !1);
        },
        fileComplete: function (e) {
          if (!this._fileList[e])
            return void console.warn(
              "Phaser.Loader fileComplete invalid index " + e
            );
          var n = this._fileList[e];
          n.loaded = !0;
          var r = !0,
            i = this;
          switch (n.type) {
            case "image":
              this.game.cache.addImage(n.key, n.url, n.data);
              break;
            case "spritesheet":
              this.game.cache.addSpriteSheet(
                n.key,
                n.url,
                n.data,
                n.frameWidth,
                n.frameHeight,
                n.frameMax,
                n.margin,
                n.spacing
              );
              break;
            case "textureatlas":
              if (null == n.atlasURL)
                this.game.cache.addTextureAtlas(
                  n.key,
                  n.url,
                  n.data,
                  n.atlasData,
                  n.format
                );
              else {
                if (
                  ((r = !1),
                  this._xhr.open("GET", this.baseURL + n.atlasURL, !0),
                  (this._xhr.responseType = "text"),
                  n.format == t.Loader.TEXTURE_ATLAS_JSON_ARRAY ||
                    n.format == t.Loader.TEXTURE_ATLAS_JSON_HASH)
                )
                  this._xhr.onload = function () {
                    return i.jsonLoadComplete(e);
                  };
                else {
                  if (n.format != t.Loader.TEXTURE_ATLAS_XML_STARLING)
                    throw new Error(
                      "Phaser.Loader. Invalid Texture Atlas format: " + n.format
                    );
                  this._xhr.onload = function () {
                    return i.xmlLoadComplete(e);
                  };
                }
                (this._xhr.onerror = function () {
                  return i.dataLoadError(e);
                }),
                  this._xhr.send();
              }
              break;
            case "bitmapfont":
              null == n.xmlURL
                ? this.game.cache.addBitmapFont(
                    n.key,
                    n.url,
                    n.data,
                    n.xmlData,
                    n.xSpacing,
                    n.ySpacing
                  )
                : ((r = !1),
                  this._xhr.open("GET", this.baseURL + n.xmlURL, !0),
                  (this._xhr.responseType = "text"),
                  (this._xhr.onload = function () {
                    return i.xmlLoadComplete(e);
                  }),
                  (this._xhr.onerror = function () {
                    return i.dataLoadError(e);
                  }),
                  this._xhr.send());
              break;
            case "audio":
              if (this.game.sound.usingWebAudio) {
                if (
                  ((n.data = this._xhr.response),
                  this.game.cache.addSound(n.key, n.url, n.data, !0, !1),
                  n.autoDecode)
                ) {
                  var s = this,
                    o = n.key;
                  this.game.cache.updateSound(o, "isDecoding", !0),
                    this.game.sound.context.decodeAudioData(
                      n.data,
                      function (e) {
                        e &&
                          (s.game.cache.decodedSound(o, e),
                          s.game.sound.onSoundDecode.dispatch(
                            o,
                            s.game.cache.getSound(o)
                          ));
                      }
                    );
                }
              } else
                n.data.removeEventListener(
                  "canplaythrough",
                  t.GAMES[this.game.id].load.fileComplete
                ),
                  this.game.cache.addSound(n.key, n.url, n.data, !1, !0);
              break;
            case "text":
              (n.data = this._xhr.responseText),
                this.game.cache.addText(n.key, n.url, n.data);
              break;
            case "physics":
              var u = JSON.parse(this._xhr.responseText);
              this.game.cache.addPhysicsData(n.key, n.url, u, n.format);
              break;
            case "script":
              (n.data = document.createElement("script")),
                (n.data.language = "javascript"),
                (n.data.type = "text/javascript"),
                (n.data.defer = !1),
                (n.data.text = this._xhr.responseText),
                document.head.appendChild(n.data),
                n.callback &&
                  (n.data = n.callback.call(
                    n.callbackContext,
                    n.key,
                    this._xhr.responseText
                  ));
              break;
            case "binary":
              (n.data = n.callback
                ? n.callback.call(n.callbackContext, n.key, this._xhr.response)
                : this._xhr.response),
                this.game.cache.addBinary(n.key, n.data);
          }
          r && this.nextFile(e, !0);
        },
        jsonLoadComplete: function (e) {
          if (!this._fileList[e])
            return void console.warn(
              "Phaser.Loader jsonLoadComplete invalid index " + e
            );
          var t = this._fileList[e],
            n = JSON.parse(this._xhr.responseText);
          (t.loaded = !0),
            "tilemap" === t.type
              ? this.game.cache.addTilemap(t.key, t.url, n, t.format)
              : "json" === t.type
              ? this.game.cache.addJSON(t.key, t.url, n)
              : this.game.cache.addTextureAtlas(
                  t.key,
                  t.url,
                  t.data,
                  n,
                  t.format
                ),
            this.nextFile(e, !0);
        },
        csvLoadComplete: function (e) {
          if (!this._fileList[e])
            return void console.warn(
              "Phaser.Loader csvLoadComplete invalid index " + e
            );
          var t = this._fileList[e],
            n = this._xhr.responseText;
          (t.loaded = !0),
            this.game.cache.addTilemap(t.key, t.url, n, t.format),
            this.nextFile(e, !0);
        },
        dataLoadError: function (e) {
          var t = this._fileList[e];
          (t.loaded = !0),
            (t.error = !0),
            console.warn("Phaser.Loader dataLoadError: " + t.key),
            this.nextFile(e, !0);
        },
        xmlLoadComplete: function (e) {
          var t,
            n = this._xhr.responseText;
          try {
            if (window.DOMParser) {
              var r = new DOMParser();
              t = r.parseFromString(n, "text/xml");
            } else
              (t = new ActiveXObject("Microsoft.XMLDOM")),
                (t.async = "false"),
                t.loadXML(n);
          } catch (i) {
            t = void 0;
          }
          if (
            !t ||
            !t.documentElement ||
            t.getElementsByTagName("parsererror").length
          )
            throw new Error("Phaser.Loader. Invalid XML given");
          var s = this._fileList[e];
          (s.loaded = !0),
            "bitmapfont" == s.type
              ? this.game.cache.addBitmapFont(
                  s.key,
                  s.url,
                  s.data,
                  t,
                  s.xSpacing,
                  s.ySpacing
                )
              : "textureatlas" == s.type &&
                this.game.cache.addTextureAtlas(
                  s.key,
                  s.url,
                  s.data,
                  t,
                  s.format
                ),
            this.nextFile(e, !0);
        },
        nextFile: function (e, t) {
          (this.progressFloat += this._progressChunk),
            (this.progress = Math.round(this.progressFloat)),
            this.progress > 100 && (this.progress = 100),
            null !== this.preloadSprite &&
              (0 === this.preloadSprite.direction
                ? ((this.preloadSprite.rect.width = Math.floor(
                    (this.preloadSprite.width / 100) * this.progress
                  )),
                  this.preloadSprite.sprite.crop(this.preloadSprite.rect))
                : ((this.preloadSprite.rect.height = Math.floor(
                    (this.preloadSprite.height / 100) * this.progress
                  )),
                  this.preloadSprite.sprite.crop(this.preloadSprite.rect))),
            this.onFileComplete.dispatch(
              this.progress,
              this._fileList[e].key,
              t,
              this.totalLoadedFiles(),
              this._fileList.length
            ),
            this.totalQueuedFiles() > 0
              ? (this._fileIndex++, this.loadFile())
              : ((this.hasLoaded = !0),
                (this.isLoading = !1),
                this.removeAll(),
                this.onLoadComplete.dispatch());
        },
        totalLoadedFiles: function () {
          for (var e = 0, t = 0; t < this._fileList.length; t++)
            this._fileList[t].loaded && e++;
          return e;
        },
        totalQueuedFiles: function () {
          for (var e = 0, t = 0; t < this._fileList.length; t++)
            this._fileList[t].loaded === !1 && e++;
          return e;
        },
      }),
      (t.Loader.prototype.constructor = t.Loader),
      (t.LoaderParser = {
        bitmapFont: function (e, t, n, r, i) {
          if (!t || /MSIE 9/i.test(navigator.userAgent))
            if ("function" == typeof window.DOMParser) {
              var s = new DOMParser();
              t = s.parseFromString(this.ajaxRequest.responseText, "text/xml");
            } else {
              var o = document.createElement("div");
              (o.innerHTML = this.ajaxRequest.responseText), (t = o);
            }
          var u = {},
            a = t.getElementsByTagName("info")[0],
            f = t.getElementsByTagName("common")[0];
          (u.font = a.getAttribute("face")),
            (u.size = parseInt(a.getAttribute("size"), 10)),
            (u.lineHeight = parseInt(f.getAttribute("lineHeight"), 10) + i),
            (u.chars = {});
          for (
            var l = t.getElementsByTagName("char"),
              c = PIXI.TextureCache[n],
              h = 0;
            h < l.length;
            h++
          ) {
            var p = parseInt(l[h].getAttribute("id"), 10),
              d = new PIXI.Rectangle(
                parseInt(l[h].getAttribute("x"), 10),
                parseInt(l[h].getAttribute("y"), 10),
                parseInt(l[h].getAttribute("width"), 10),
                parseInt(l[h].getAttribute("height"), 10)
              );
            u.chars[p] = {
              xOffset: parseInt(l[h].getAttribute("xoffset"), 10),
              yOffset: parseInt(l[h].getAttribute("yoffset"), 10),
              xAdvance: parseInt(l[h].getAttribute("xadvance"), 10) + r,
              kerning: {},
              texture: (PIXI.TextureCache[n] = new PIXI.Texture(c, d)),
            };
          }
          var v = t.getElementsByTagName("kerning");
          for (h = 0; h < v.length; h++) {
            var m = parseInt(v[h].getAttribute("first"), 10),
              g = parseInt(v[h].getAttribute("second"), 10),
              y = parseInt(v[h].getAttribute("amount"), 10);
            u.chars[g].kerning[m] = y;
          }
          PIXI.BitmapText.fonts[n] = u;
        },
      }),
      (t.Sound = function (e, n, r, i, s) {
        "undefined" == typeof r && (r = 1),
          "undefined" == typeof i && (i = !1),
          "undefined" == typeof s && (s = e.sound.connectToMaster),
          (this.game = e),
          (this.name = n),
          (this.key = n),
          (this.loop = i),
          (this._volume = r),
          (this.markers = {}),
          (this.context = null),
          (this._buffer = null),
          (this._muted = !1),
          (this.autoplay = !1),
          (this.totalDuration = 0),
          (this.startTime = 0),
          (this.currentTime = 0),
          (this.duration = 0),
          (this.stopTime = 0),
          (this.paused = !1),
          (this.pausedPosition = 0),
          (this.pausedTime = 0),
          (this.isPlaying = !1),
          (this.currentMarker = ""),
          (this.pendingPlayback = !1),
          (this.override = !1),
          (this.usingWebAudio = this.game.sound.usingWebAudio),
          (this.usingAudioTag = this.game.sound.usingAudioTag),
          (this.externalNode = null),
          this.usingWebAudio
            ? ((this.context = this.game.sound.context),
              (this.masterGainNode = this.game.sound.masterGain),
              (this.gainNode =
                "undefined" == typeof this.context.createGain
                  ? this.context.createGainNode()
                  : this.context.createGain()),
              (this.gainNode.gain.value = r * this.game.sound.volume),
              s && this.gainNode.connect(this.masterGainNode))
            : this.game.cache.getSound(n) && this.game.cache.isSoundReady(n)
            ? ((this._sound = this.game.cache.getSoundData(n)),
              (this.totalDuration = 0),
              this._sound.duration &&
                (this.totalDuration = this._sound.duration))
            : this.game.cache.onSoundUnlock.add(this.soundHasUnlocked, this),
          (this.onDecoded = new t.Signal()),
          (this.onPlay = new t.Signal()),
          (this.onPause = new t.Signal()),
          (this.onResume = new t.Signal()),
          (this.onLoop = new t.Signal()),
          (this.onStop = new t.Signal()),
          (this.onMute = new t.Signal()),
          (this.onMarkerComplete = new t.Signal());
      }),
      (t.Sound.prototype = {
        soundHasUnlocked: function (e) {
          e == this.key &&
            ((this._sound = this.game.cache.getSoundData(this.key)),
            (this.totalDuration = this._sound.duration));
        },
        addMarker: function (e, t, n, r, i) {
          "undefined" == typeof r && (r = 1),
            "undefined" == typeof i && (i = !1),
            (this.markers[e] = {
              name: e,
              start: t,
              stop: t + n,
              volume: r,
              duration: n,
              durationMS: 1e3 * n,
              loop: i,
            });
        },
        removeMarker: function (e) {
          delete this.markers[e];
        },
        update: function () {
          this.pendingPlayback &&
            this.game.cache.isSoundReady(this.key) &&
            ((this.pendingPlayback = !1),
            this.play(
              this._tempMarker,
              this._tempPosition,
              this._tempVolume,
              this._tempLoop
            )),
            this.isPlaying &&
              ((this.currentTime = this.game.time.now - this.startTime),
              this.currentTime >= this.durationMS &&
                (this.usingWebAudio
                  ? this.loop
                    ? (this.onLoop.dispatch(this),
                      "" === this.currentMarker
                        ? ((this.currentTime = 0),
                          (this.startTime = this.game.time.now))
                        : (this.onMarkerComplete.dispatch(
                            this.currentMarker,
                            this
                          ),
                          this.play(
                            this.currentMarker,
                            0,
                            this.volume,
                            !0,
                            !0
                          )))
                    : this.stop()
                  : this.loop
                  ? (this.onLoop.dispatch(this),
                    this.play(this.currentMarker, 0, this.volume, !0, !0))
                  : this.stop()));
        },
        play: function (e, t, n, r, i) {
          if (
            ("undefined" == typeof e && (e = ""),
            "undefined" == typeof i && (i = !0),
            this.isPlaying !== !0 || i !== !1 || this.override !== !1)
          ) {
            if (
              (this.isPlaying &&
                this.override &&
                (this.usingWebAudio
                  ? "undefined" == typeof this._sound.stop
                    ? this._sound.noteOff(0)
                    : this._sound.stop(0)
                  : this.usingAudioTag &&
                    (this._sound.pause(), (this._sound.currentTime = 0))),
              (this.currentMarker = e),
              "" !== e)
            ) {
              if (!this.markers[e])
                return void console.warn(
                  "Phaser.Sound.play: audio marker " + e + " doesn't exist"
                );
              (this.position = this.markers[e].start),
                (this.volume = this.markers[e].volume),
                (this.loop = this.markers[e].loop),
                (this.duration = this.markers[e].duration),
                (this.durationMS = this.markers[e].durationMS),
                "undefined" != typeof n && (this.volume = n),
                "undefined" != typeof r && (this.loop = r),
                (this._tempMarker = e),
                (this._tempPosition = this.position),
                (this._tempVolume = this.volume),
                (this._tempLoop = this.loop);
            } else
              (t = t || 0),
                "undefined" == typeof n && (n = this._volume),
                "undefined" == typeof r && (r = this.loop),
                (this.position = t),
                (this.volume = n),
                (this.loop = r),
                (this.duration = 0),
                (this.durationMS = 0),
                (this._tempMarker = e),
                (this._tempPosition = t),
                (this._tempVolume = n),
                (this._tempLoop = r);
            this.usingWebAudio
              ? this.game.cache.isSoundDecoded(this.key)
                ? (null == this._buffer &&
                    (this._buffer = this.game.cache.getSoundData(this.key)),
                  (this._sound = this.context.createBufferSource()),
                  (this._sound.buffer = this._buffer),
                  this._sound.connect(
                    this.externalNode ? this.externalNode.input : this.gainNode
                  ),
                  (this.totalDuration = this._sound.buffer.duration),
                  0 === this.duration &&
                    ((this.duration = this.totalDuration),
                    (this.durationMS = 1e3 * this.totalDuration)),
                  this.loop && "" === e && (this._sound.loop = !0),
                  "undefined" == typeof this._sound.start
                    ? this._sound.noteGrainOn(0, this.position, this.duration)
                    : this._sound.start(0, this.position, this.duration),
                  (this.isPlaying = !0),
                  (this.startTime = this.game.time.now),
                  (this.currentTime = 0),
                  (this.stopTime = this.startTime + this.durationMS),
                  this.onPlay.dispatch(this))
                : ((this.pendingPlayback = !0),
                  this.game.cache.getSound(this.key) &&
                    this.game.cache.getSound(this.key).isDecoding === !1 &&
                    this.game.sound.decode(this.key, this))
              : this.game.cache.getSound(this.key) &&
                this.game.cache.getSound(this.key).locked
              ? (this.game.cache.reloadSound(this.key),
                (this.pendingPlayback = !0))
              : this._sound &&
                (this.game.device.cocoonJS || 4 === this._sound.readyState)
              ? (this._sound.play(),
                (this.totalDuration = this._sound.duration),
                0 === this.duration &&
                  ((this.duration = this.totalDuration),
                  (this.durationMS = 1e3 * this.totalDuration)),
                (this._sound.currentTime = this.position),
                (this._sound.muted = this._muted),
                (this._sound.volume = this._muted ? 0 : this._volume),
                (this.isPlaying = !0),
                (this.startTime = this.game.time.now),
                (this.currentTime = 0),
                (this.stopTime = this.startTime + this.durationMS),
                this.onPlay.dispatch(this))
              : (this.pendingPlayback = !0);
          }
        },
        restart: function (e, t, n, r) {
          (e = e || ""),
            (t = t || 0),
            (n = n || 1),
            "undefined" == typeof r && (r = !1),
            this.play(e, t, n, r, !0);
        },
        pause: function () {
          this.isPlaying &&
            this._sound &&
            (this.stop(),
            (this.isPlaying = !1),
            (this.paused = !0),
            (this.pausedPosition = this.currentTime),
            (this.pausedTime = this.game.time.now),
            this.onPause.dispatch(this));
        },
        resume: function () {
          if (this.paused && this._sound) {
            if (this.usingWebAudio) {
              var e = this.position + this.pausedPosition / 1e3;
              (this._sound = this.context.createBufferSource()),
                (this._sound.buffer = this._buffer),
                this._sound.connect(
                  this.externalNode ? this.externalNode.input : this.gainNode
                ),
                this.loop && (this._sound.loop = !0),
                "undefined" == typeof this._sound.start
                  ? this._sound.noteGrainOn(0, e, this.duration)
                  : this._sound.start(0, e, this.duration);
            } else this._sound.play();
            (this.isPlaying = !0),
              (this.paused = !1),
              (this.startTime += this.game.time.now - this.pausedTime),
              this.onResume.dispatch(this);
          }
        },
        stop: function () {
          this.isPlaying &&
            this._sound &&
            (this.usingWebAudio
              ? "undefined" == typeof this._sound.stop
                ? this._sound.noteOff(0)
                : this._sound.stop(0)
              : this.usingAudioTag &&
                (this._sound.pause(), (this._sound.currentTime = 0))),
            (this.isPlaying = !1);
          var e = this.currentMarker;
          "" !== this.currentMarker &&
            this.onMarkerComplete.dispatch(this.currentMarker, this),
            (this.currentMarker = ""),
            this.onStop.dispatch(this, e);
        },
      }),
      (t.Sound.prototype.constructor = t.Sound),
      Object.defineProperty(t.Sound.prototype, "isDecoding", {
        get: function () {
          return this.game.cache.getSound(this.key).isDecoding;
        },
      }),
      Object.defineProperty(t.Sound.prototype, "isDecoded", {
        get: function () {
          return this.game.cache.isSoundDecoded(this.key);
        },
      }),
      Object.defineProperty(t.Sound.prototype, "mute", {
        get: function () {
          return this._muted;
        },
        set: function (e) {
          (e = e || null),
            e
              ? ((this._muted = !0),
                this.usingWebAudio
                  ? ((this._muteVolume = this.gainNode.gain.value),
                    (this.gainNode.gain.value = 0))
                  : this.usingAudioTag &&
                    this._sound &&
                    ((this._muteVolume = this._sound.volume),
                    (this._sound.volume = 0)))
              : ((this._muted = !1),
                this.usingWebAudio
                  ? (this.gainNode.gain.value = this._muteVolume)
                  : this.usingAudioTag &&
                    this._sound &&
                    (this._sound.volume = this._muteVolume)),
            this.onMute.dispatch(this);
        },
      }),
      Object.defineProperty(t.Sound.prototype, "volume", {
        get: function () {
          return this._volume;
        },
        set: function (e) {
          this.usingWebAudio
            ? ((this._volume = e), (this.gainNode.gain.value = e))
            : this.usingAudioTag &&
              this._sound &&
              e >= 0 &&
              1 >= e &&
              ((this._volume = e), (this._sound.volume = e));
        },
      }),
      (t.SoundManager = function (e) {
        (this.game = e),
          (this.onSoundDecode = new t.Signal()),
          (this._codeMuted = !1),
          (this._muted = !1),
          (this._unlockSource = null),
          (this._volume = 1),
          (this._sounds = []),
          (this.context = null),
          (this.usingWebAudio = !0),
          (this.usingAudioTag = !1),
          (this.noAudio = !1),
          (this.connectToMaster = !0),
          (this.touchLocked = !1),
          (this.channels = 32);
      }),
      (t.SoundManager.prototype = {
        boot: function () {
          if (
            (this.game.device.iOS &&
              this.game.device.webAudio === !1 &&
              (this.channels = 1),
            this.game.device.iOS ||
            (window.PhaserGlobal && window.PhaserGlobal.fakeiOSTouchLock)
              ? ((this.game.input.touch.callbackContext = this),
                (this.game.input.touch.touchStartCallback = this.unlock),
                (this.game.input.mouse.callbackContext = this),
                (this.game.input.mouse.mouseDownCallback = this.unlock),
                (this.touchLocked = !0))
              : (this.touchLocked = !1),
            window.PhaserGlobal)
          ) {
            if (window.PhaserGlobal.disableAudio === !0)
              return (this.usingWebAudio = !1), void (this.noAudio = !0);
            if (window.PhaserGlobal.disableWebAudio === !0)
              return (
                (this.usingWebAudio = !1),
                (this.usingAudioTag = !0),
                void (this.noAudio = !1)
              );
          }
          window.AudioContext
            ? (this.context = new window.AudioContext())
            : window.webkitAudioContext
            ? (this.context = new window.webkitAudioContext())
            : window.Audio
            ? ((this.usingWebAudio = !1), (this.usingAudioTag = !0))
            : ((this.usingWebAudio = !1), (this.noAudio = !0)),
            null !== this.context &&
              ((this.masterGain =
                "undefined" == typeof this.context.createGain
                  ? this.context.createGainNode()
                  : this.context.createGain()),
              (this.masterGain.gain.value = 1),
              this.masterGain.connect(this.context.destination));
        },
        unlock: function () {
          if (this.touchLocked !== !1)
            if (
              this.game.device.webAudio === !1 ||
              (window.PhaserGlobal &&
                window.PhaserGlobal.disableWebAudio === !0)
            )
              (this.touchLocked = !1),
                (this._unlockSource = null),
                (this.game.input.touch.callbackContext = null),
                (this.game.input.touch.touchStartCallback = null),
                (this.game.input.mouse.callbackContext = null),
                (this.game.input.mouse.mouseDownCallback = null);
            else {
              var e = this.context.createBuffer(1, 1, 22050);
              (this._unlockSource = this.context.createBufferSource()),
                (this._unlockSource.buffer = e),
                this._unlockSource.connect(this.context.destination),
                this._unlockSource.noteOn(0);
            }
        },
        stopAll: function () {
          for (var e = 0; e < this._sounds.length; e++)
            this._sounds[e] && this._sounds[e].stop();
        },
        pauseAll: function () {
          for (var e = 0; e < this._sounds.length; e++)
            this._sounds[e] && this._sounds[e].pause();
        },
        resumeAll: function () {
          for (var e = 0; e < this._sounds.length; e++)
            this._sounds[e] && this._sounds[e].resume();
        },
        decode: function (e, t) {
          t = t || null;
          var n = this.game.cache.getSoundData(e);
          if (n && this.game.cache.isSoundDecoded(e) === !1) {
            this.game.cache.updateSound(e, "isDecoding", !0);
            var r = this;
            this.context.decodeAudioData(n, function (n) {
              r.game.cache.decodedSound(e, n),
                t && r.onSoundDecode.dispatch(e, t);
            });
          }
        },
        update: function () {
          this.touchLocked &&
            this.game.device.webAudio &&
            null !== this._unlockSource &&
            (this._unlockSource.playbackState ===
              this._unlockSource.PLAYING_STATE ||
              this._unlockSource.playbackState ===
                this._unlockSource.FINISHED_STATE) &&
            ((this.touchLocked = !1),
            (this._unlockSource = null),
            (this.game.input.touch.callbackContext = null),
            (this.game.input.touch.touchStartCallback = null));
          for (var e = 0; e < this._sounds.length; e++)
            this._sounds[e].update();
        },
        add: function (e, n, r, i) {
          "undefined" == typeof n && (n = 1),
            "undefined" == typeof r && (r = !1),
            "undefined" == typeof i && (i = this.connectToMaster);
          var s = new t.Sound(this.game, e, n, r, i);
          return this._sounds.push(s), s;
        },
        play: function (e, t, n) {
          var r = this.add(e, t, n);
          return r.play(), r;
        },
        setMute: function () {
          if (!this._muted) {
            (this._muted = !0),
              this.usingWebAudio &&
                ((this._muteVolume = this.masterGain.gain.value),
                (this.masterGain.gain.value = 0));
            for (var e = 0; e < this._sounds.length; e++)
              this._sounds[e].usingAudioTag && (this._sounds[e].mute = !0);
          }
        },
        unsetMute: function () {
          if (this._muted && !this._codeMuted) {
            (this._muted = !1),
              this.usingWebAudio &&
                (this.masterGain.gain.value = this._muteVolume);
            for (var e = 0; e < this._sounds.length; e++)
              this._sounds[e].usingAudioTag && (this._sounds[e].mute = !1);
          }
        },
      }),
      (t.SoundManager.prototype.constructor = t.SoundManager),
      Object.defineProperty(t.SoundManager.prototype, "mute", {
        get: function () {
          return this._muted;
        },
        set: function (e) {
          if ((e = e || null)) {
            if (this._muted) return;
            (this._codeMuted = !0), this.setMute();
          } else {
            if (this._muted === !1) return;
            (this._codeMuted = !1), this.unsetMute();
          }
        },
      }),
      Object.defineProperty(t.SoundManager.prototype, "volume", {
        get: function () {
          return this.usingWebAudio ? this.masterGain.gain.value : this._volume;
        },
        set: function (e) {
          if (((this._volume = e), this.usingWebAudio))
            this.masterGain.gain.value = e;
          else
            for (var t = 0; t < this._sounds.length; t++)
              this._sounds[t].usingAudioTag &&
                (this._sounds[t].volume = this._sounds[t].volume * e);
        },
      }),
      (t.Utils.Debug = function (e) {
        (this.game = e),
          (this.sprite = null),
          (this.canvas = null),
          (this.baseTexture = null),
          (this.texture = null),
          (this.textureFrame = null),
          (this.context = null),
          (this.font = "14px Courier"),
          (this.columnWidth = 100),
          (this.lineHeight = 16),
          (this.renderShadow = !0),
          (this.currentX = 0),
          (this.currentY = 0),
          (this.currentAlpha = 1),
          (this.dirty = !1);
      }),
      (t.Utils.Debug.prototype = {
        boot: function () {
          this.game.renderType === t.CANVAS
            ? (this.context = this.game.context)
            : ((this.canvas = t.Canvas.create(
                this.game.width,
                this.game.height,
                "",
                !0
              )),
              (this.context = this.canvas.getContext("2d")),
              (this.baseTexture = new PIXI.BaseTexture(this.canvas)),
              (this.texture = new PIXI.Texture(this.baseTexture)),
              (this.textureFrame = new t.Frame(
                0,
                0,
                0,
                this.game.width,
                this.game.height,
                "debug",
                this.game.rnd.uuid()
              )),
              (this.sprite = this.game.make.image(
                0,
                0,
                this.texture,
                this.textureFrame
              )),
              this.game.stage.addChild(this.sprite));
        },
        preUpdate: function () {
          this.dirty &&
            this.sprite &&
            (this.context.clearRect(0, 0, this.game.width, this.game.height),
            (this.dirty = !1));
        },
        start: function (e, t, n, r) {
          "number" != typeof e && (e = 0),
            "number" != typeof t && (t = 0),
            (n = n || "rgb(255,255,255)"),
            "undefined" == typeof r && (r = 0),
            (this.currentX = e),
            (this.currentY = t),
            (this.currentColor = n),
            (this.currentAlpha = this.context.globalAlpha),
            (this.columnWidth = r),
            this.sprite && (this.dirty = !0),
            this.context.save(),
            this.context.setTransform(1, 0, 0, 1, 0, 0),
            (this.context.strokeStyle = n),
            (this.context.fillStyle = n),
            (this.context.font = this.font),
            (this.context.globalAlpha = 1);
        },
        stop: function () {
          this.context.restore(),
            (this.context.globalAlpha = this.currentAlpha),
            this.sprite &&
              PIXI.updateWebGLTexture(this.baseTexture, this.game.renderer.gl);
        },
        line: function () {
          for (var e = this.currentX, t = 0; t < arguments.length; t++)
            this.renderShadow &&
              ((this.context.fillStyle = "rgb(0,0,0)"),
              this.context.fillText(arguments[t], e + 1, this.currentY + 1),
              (this.context.fillStyle = this.currentColor)),
              this.context.fillText(arguments[t], e, this.currentY),
              (e += this.columnWidth);
          this.currentY += this.lineHeight;
        },
        soundInfo: function (e, t, n, r) {
          this.start(t, n, r),
            this.line(
              "Sound: " + e.key + " Locked: " + e.game.sound.touchLocked
            ),
            this.line(
              "Is Ready?: " +
                this.game.cache.isSoundReady(e.key) +
                " Pending Playback: " +
                e.pendingPlayback
            ),
            this.line("Decoded: " + e.isDecoded + " Decoding: " + e.isDecoding),
            this.line(
              "Total Duration: " + e.totalDuration + " Playing: " + e.isPlaying
            ),
            this.line("Time: " + e.currentTime),
            this.line("Volume: " + e.volume + " Muted: " + e.mute),
            this.line(
              "WebAudio: " + e.usingWebAudio + " Audio: " + e.usingAudioTag
            ),
            "" !== e.currentMarker &&
              (this.line(
                "Marker: " + e.currentMarker + " Duration: " + e.duration
              ),
              this.line(
                "Start: " +
                  e.markers[e.currentMarker].start +
                  " Stop: " +
                  e.markers[e.currentMarker].stop
              ),
              this.line("Position: " + e.position)),
            this.stop();
        },
        cameraInfo: function (e, t, n, r) {
          this.start(t, n, r),
            this.line("Camera (" + e.width + " x " + e.height + ")"),
            this.line("X: " + e.x + " Y: " + e.y),
            this.line(
              "Bounds x: " +
                e.bounds.x +
                " Y: " +
                e.bounds.y +
                " w: " +
                e.bounds.width +
                " h: " +
                e.bounds.height
            ),
            this.line(
              "View x: " +
                e.view.x +
                " Y: " +
                e.view.y +
                " w: " +
                e.view.width +
                " h: " +
                e.view.height
            ),
            this.stop();
        },
        pointer: function (e, t, n, r, i) {
          null != e &&
            ("undefined" == typeof t && (t = !1),
            (n = n || "rgba(0,255,0,0.5)"),
            (r = r || "rgba(255,0,0,0.5)"),
            (t !== !0 || e.isUp !== !0) &&
              (this.start(e.x, e.y - 100, i),
              this.context.beginPath(),
              this.context.arc(e.x, e.y, e.circle.radius, 0, 2 * Math.PI),
              (this.context.fillStyle = e.active ? n : r),
              this.context.fill(),
              this.context.closePath(),
              this.context.beginPath(),
              this.context.moveTo(e.positionDown.x, e.positionDown.y),
              this.context.lineTo(e.position.x, e.position.y),
              (this.context.lineWidth = 2),
              this.context.stroke(),
              this.context.closePath(),
              this.line("ID: " + e.id + " Active: " + e.active),
              this.line("World X: " + e.worldX + " World Y: " + e.worldY),
              this.line("Screen X: " + e.x + " Screen Y: " + e.y),
              this.line("Duration: " + e.duration + " ms"),
              this.line("is Down: " + e.isDown + " is Up: " + e.isUp),
              this.stop()));
        },
        spriteInputInfo: function (e, t, n, r) {
          this.start(t, n, r),
            this.line("Sprite Input: (" + e.width + " x " + e.height + ")"),
            this.line(
              "x: " +
                e.input.pointerX().toFixed(1) +
                " y: " +
                e.input.pointerY().toFixed(1)
            ),
            this.line(
              "over: " +
                e.input.pointerOver() +
                " duration: " +
                e.input.overDuration().toFixed(0)
            ),
            this.line(
              "down: " +
                e.input.pointerDown() +
                " duration: " +
                e.input.downDuration().toFixed(0)
            ),
            this.line(
              "just over: " +
                e.input.justOver() +
                " just out: " +
                e.input.justOut()
            ),
            this.stop();
        },
        key: function (e, t, n, r) {
          this.start(t, n, r, 150),
            this.line("Key:", e.keyCode, "isDown:", e.isDown),
            this.line(
              "justPressed:",
              e.justPressed(),
              "justReleased:",
              e.justReleased()
            ),
            this.line(
              "Time Down:",
              e.timeDown.toFixed(0),
              "duration:",
              e.duration.toFixed(0)
            ),
            this.stop();
        },
        inputInfo: function (e, t, n) {
          this.start(e, t, n),
            this.line("Input"),
            this.line("X: " + this.game.input.x + " Y: " + this.game.input.y),
            this.line(
              "World X: " +
                this.game.input.worldX +
                " World Y: " +
                this.game.input.worldY
            ),
            this.line(
              "Scale X: " +
                this.game.input.scale.x.toFixed(1) +
                " Scale Y: " +
                this.game.input.scale.x.toFixed(1)
            ),
            this.line(
              "Screen X: " +
                this.game.input.activePointer.screenX +
                " Screen Y: " +
                this.game.input.activePointer.screenY
            ),
            this.stop();
        },
        spriteBounds: function (e, t, n) {
          var r = e.getBounds();
          (r.x += this.game.camera.x),
            (r.y += this.game.camera.y),
            this.rectangle(r, t, n);
        },
        spriteInfo: function (e, t, n, r) {
          this.start(t, n, r),
            this.line(
              "Sprite:  (" +
                e.width +
                " x " +
                e.height +
                ") anchor: " +
                e.anchor.x +
                " x " +
                e.anchor.y
            ),
            this.line("x: " + e.x.toFixed(1) + " y: " + e.y.toFixed(1)),
            this.line(
              "angle: " +
                e.angle.toFixed(1) +
                " rotation: " +
                e.rotation.toFixed(1)
            ),
            this.line("visible: " + e.visible + " in camera: " + e.inCamera),
            this.stop();
        },
        spriteCoords: function (e, t, n, r) {
          this.start(t, n, r, 100),
            e.name && this.line(e.name),
            this.line("x:", e.x.toFixed(2), "y:", e.y.toFixed(2)),
            this.line(
              "pos x:",
              e.position.x.toFixed(2),
              "pos y:",
              e.position.y.toFixed(2)
            ),
            this.line(
              "world x:",
              e.world.x.toFixed(2),
              "world y:",
              e.world.y.toFixed(2)
            ),
            this.stop();
        },
        lineInfo: function (e, t, n, r) {
          this.start(t, n, r, 80),
            this.line(
              "start.x:",
              e.start.x.toFixed(2),
              "start.y:",
              e.start.y.toFixed(2)
            ),
            this.line(
              "end.x:",
              e.end.x.toFixed(2),
              "end.y:",
              e.end.y.toFixed(2)
            ),
            this.line("length:", e.length.toFixed(2), "angle:", e.angle),
            this.stop();
        },
        pixel: function (e, t, n, r) {
          (r = r || 2),
            this.start(),
            (this.context.fillStyle = n),
            this.context.fillRect(e, t, r, r),
            this.stop();
        },
        geom: function (e, n, r, i) {
          "undefined" == typeof r && (r = !0),
            "undefined" == typeof i && (i = 0),
            (n = n || "rgba(0,255,0,0.4)"),
            this.start(),
            (this.context.fillStyle = n),
            (this.context.strokeStyle = n),
            e instanceof t.Rectangle || 1 === i
              ? r
                ? this.context.fillRect(
                    e.x - this.game.camera.x,
                    e.y - this.game.camera.y,
                    e.width,
                    e.height
                  )
                : this.context.strokeRect(
                    e.x - this.game.camera.x,
                    e.y - this.game.camera.y,
                    e.width,
                    e.height
                  )
              : e instanceof t.Circle || 2 === i
              ? (this.context.beginPath(),
                this.context.arc(
                  e.x - this.game.camera.x,
                  e.y - this.game.camera.y,
                  e.radius,
                  0,
                  2 * Math.PI,
                  !1
                ),
                this.context.closePath(),
                r ? this.context.fill() : this.context.stroke())
              : e instanceof t.Point || 3 === i
              ? this.context.fillRect(
                  e.x - this.game.camera.x,
                  e.y - this.game.camera.y,
                  4,
                  4
                )
              : (e instanceof t.Line || 4 === i) &&
                ((this.context.lineWidth = 1),
                this.context.beginPath(),
                this.context.moveTo(
                  e.start.x + 0.5 - this.game.camera.x,
                  e.start.y + 0.5 - this.game.camera.y
                ),
                this.context.lineTo(
                  e.end.x + 0.5 - this.game.camera.x,
                  e.end.y + 0.5 - this.game.camera.y
                ),
                this.context.closePath(),
                this.context.stroke()),
            this.stop();
        },
        rectangle: function (e, t, n) {
          "undefined" == typeof n && (n = !0),
            (t = t || "rgba(0, 255, 0, 0.4)"),
            this.start(),
            n
              ? ((this.context.fillStyle = t),
                this.context.fillRect(
                  e.x - this.game.camera.x,
                  e.y - this.game.camera.y,
                  e.width,
                  e.height
                ))
              : ((this.context.strokeStyle = t),
                this.context.strokeRect(
                  e.x - this.game.camera.x,
                  e.y - this.game.camera.y,
                  e.width,
                  e.height
                )),
            this.stop();
        },
        text: function (e, t, n, r, i) {
          (r = r || "rgb(255,255,255)"),
            (i = i || "16px Courier"),
            this.start(),
            (this.context.font = i),
            this.renderShadow &&
              ((this.context.fillStyle = "rgb(0,0,0)"),
              this.context.fillText(e, t + 1, n + 1)),
            (this.context.fillStyle = r),
            this.context.fillText(e, t, n),
            this.stop();
        },
        quadTree: function (e, t) {
          (t = t || "rgba(255,0,0,0.3)"), this.start();
          var n = e.bounds;
          if (0 === e.nodes.length) {
            (this.context.strokeStyle = t),
              this.context.strokeRect(n.x, n.y, n.width, n.height),
              this.text(
                "size: " + e.objects.length,
                n.x + 4,
                n.y + 16,
                "rgb(0,200,0)",
                "12px Courier"
              ),
              (this.context.strokeStyle = "rgb(0,255,0)");
            for (var r = 0; r < e.objects.length; r++)
              this.context.strokeRect(
                e.objects[r].x,
                e.objects[r].y,
                e.objects[r].width,
                e.objects[r].height
              );
          } else
            for (var r = 0; r < e.nodes.length; r++) this.quadTree(e.nodes[r]);
          this.stop();
        },
        body: function (e, n, r) {
          e.body &&
            e.body.type === t.Physics.ARCADE &&
            (this.start(),
            t.Physics.Arcade.Body.render(this.context, e.body, n, r),
            this.stop());
        },
        bodyInfo: function (e, n, r, i) {
          e.body &&
            e.body.type === t.Physics.ARCADE &&
            (this.start(n, r, i, 210),
            t.Physics.Arcade.Body.renderBodyInfo(this, e.body),
            this.stop());
        },
      }),
      (t.Utils.Debug.prototype.constructor = t.Utils.Debug),
      (t.Color = {
        getColor32: function (e, t, n, r) {
          return (e << 24) | (t << 16) | (n << 8) | r;
        },
        getColor: function (e, t, n) {
          return (e << 16) | (t << 8) | n;
        },
        hexToRGB: function (e) {
          var t = "#" == e.charAt(0) ? e.substring(1, 7) : e;
          3 == t.length &&
            (t =
              t.charAt(0) +
              t.charAt(0) +
              t.charAt(1) +
              t.charAt(1) +
              t.charAt(2) +
              t.charAt(2));
          var n = parseInt(t.substring(0, 2), 16),
            r = parseInt(t.substring(2, 4), 16),
            i = parseInt(t.substring(4, 6), 16);
          return (n << 16) | (r << 8) | i;
        },
        getColorInfo: function (e) {
          var n = t.Color.getRGB(e),
            r = t.Color.RGBtoHSV(e),
            i = t.Color.RGBtoHexstring(e) + "\n";
          return (
            (i =
              i.concat(
                "Alpha: " +
                  n.alpha +
                  " Red: " +
                  n.red +
                  " Green: " +
                  n.green +
                  " Blue: " +
                  n.blue
              ) + "\n"),
            (i = i.concat(
              "Hue: " +
                r.hue +
                " Saturation: " +
                r.saturation +
                " Lightnes: " +
                r.lightness
            ))
          );
        },
        RGBtoHexstring: function (e) {
          var n = t.Color.getRGB(e);
          return (
            "0x" +
            t.Color.colorToHexstring(n.alpha) +
            t.Color.colorToHexstring(n.red) +
            t.Color.colorToHexstring(n.green) +
            t.Color.colorToHexstring(n.blue)
          );
        },
        RGBtoWebstring: function (e) {
          var n = t.Color.getRGB(e);
          return (
            "#" +
            t.Color.colorToHexstring(n.red) +
            t.Color.colorToHexstring(n.green) +
            t.Color.colorToHexstring(n.blue)
          );
        },
        colorToHexstring: function (e) {
          var t = "0123456789ABCDEF",
            n = e % 16,
            r = (e - n) / 16,
            i = t.charAt(r) + t.charAt(n);
          return i;
        },
        interpolateColor: function (e, n, r, i, s) {
          "undefined" == typeof s && (s = 255);
          var o = t.Color.getRGB(e),
            u = t.Color.getRGB(n),
            a = ((u.red - o.red) * i) / r + o.red,
            f = ((u.green - o.green) * i) / r + o.green,
            l = ((u.blue - o.blue) * i) / r + o.blue;
          return t.Color.getColor32(s, a, f, l);
        },
        interpolateColorWithRGB: function (e, n, r, i, s, o) {
          var u = t.Color.getRGB(e),
            a = ((n - u.red) * o) / s + u.red,
            f = ((r - u.green) * o) / s + u.green,
            l = ((i - u.blue) * o) / s + u.blue;
          return t.Color.getColor(a, f, l);
        },
        interpolateRGB: function (e, n, r, i, s, o, u, a) {
          var f = ((i - e) * a) / u + e,
            l = ((s - n) * a) / u + n,
            c = ((o - r) * a) / u + r;
          return t.Color.getColor(f, l, c);
        },
        getRandomColor: function (e, n, r) {
          if (
            ("undefined" == typeof e && (e = 0),
            "undefined" == typeof n && (n = 255),
            "undefined" == typeof r && (r = 255),
            n > 255)
          )
            return t.Color.getColor(255, 255, 255);
          if (e > n) return t.Color.getColor(255, 255, 255);
          var i = e + Math.round(Math.random() * (n - e)),
            s = e + Math.round(Math.random() * (n - e)),
            o = e + Math.round(Math.random() * (n - e));
          return t.Color.getColor32(r, i, s, o);
        },
        getRGB: function (e) {
          return {
            alpha: e >>> 24,
            red: (e >> 16) & 255,
            green: (e >> 8) & 255,
            blue: 255 & e,
          };
        },
        getWebRGB: function (e) {
          var t = (e >>> 24) / 255,
            n = (e >> 16) & 255,
            r = (e >> 8) & 255,
            i = 255 & e;
          return (
            "rgba(" +
            n.toString() +
            "," +
            r.toString() +
            "," +
            i.toString() +
            "," +
            t.toString() +
            ")"
          );
        },
        getAlpha: function (e) {
          return e >>> 24;
        },
        getAlphaFloat: function (e) {
          return (e >>> 24) / 255;
        },
        getRed: function (e) {
          return (e >> 16) & 255;
        },
        getGreen: function (e) {
          return (e >> 8) & 255;
        },
        getBlue: function (e) {
          return 255 & e;
        },
      }),
      (t.Physics = function (e, t) {
        (t = t || {}),
          (this.game = e),
          (this.config = t),
          (this.arcade = null),
          (this.p2 = null),
          (this.ninja = null),
          (this.box2d = null),
          (this.chipmunk = null),
          this.parseConfig();
      }),
      (t.Physics.ARCADE = 0),
      (t.Physics.P2JS = 1),
      (t.Physics.NINJA = 2),
      (t.Physics.BOX2D = 3),
      (t.Physics.CHIPMUNK = 5),
      (t.Physics.prototype = {
        parseConfig: function () {
          (this.config.hasOwnProperty("arcade") && this.config.arcade !== !0) ||
            !t.Physics.hasOwnProperty("Arcade") ||
            ((this.arcade = new t.Physics.Arcade(this.game)),
            (this.game.time.deltaCap = 0.2)),
            this.config.hasOwnProperty("ninja") &&
              this.config.ninja === !0 &&
              t.Physics.hasOwnProperty("Ninja") &&
              (this.ninja = new t.Physics.Ninja(this.game)),
            this.config.hasOwnProperty("p2") &&
              this.config.p2 === !0 &&
              t.Physics.hasOwnProperty("P2") &&
              (this.p2 = new t.Physics.P2(this.game, this.config));
        },
        startSystem: function (e) {
          if (
            (e === t.Physics.ARCADE
              ? (this.arcade = new t.Physics.Arcade(this.game))
              : e === t.Physics.P2JS &&
                (this.p2 = new t.Physics.P2(this.game, this.config)),
            e === t.Physics.NINJA)
          )
            this.ninja = new t.Physics.Ninja(this.game);
          else {
            if (e === t.Physics.BOX2D && null === this.box2d)
              throw new Error(
                "The Box2D physics system has not been implemented yet."
              );
            if (e === t.Physics.CHIPMUNK && null === this.chipmunk)
              throw new Error(
                "The Chipmunk physics system has not been implemented yet."
              );
          }
        },
        enable: function (e, n, r) {
          "undefined" == typeof n && (n = t.Physics.ARCADE),
            "undefined" == typeof r && (r = !1),
            n === t.Physics.ARCADE
              ? this.arcade.enable(e)
              : n === t.Physics.P2JS && this.p2
              ? this.p2.enable(e, r)
              : n === t.Physics.NINJA && this.ninja && this.ninja.enableAABB(e);
        },
        preUpdate: function () {
          this.p2 && this.p2.preUpdate();
        },
        update: function () {
          this.p2 && this.p2.update();
        },
        setBoundsToWorld: function () {
          this.arcade && this.arcade.setBoundsToWorld(),
            this.ninja && this.ninja.setBoundsToWorld(),
            this.p2 && this.p2.setBoundsToWorld();
        },
        clear: function () {
          this.p2 && this.p2.clear();
        },
        destroy: function () {
          this.p2 && this.p2.destroy(),
            (this.arcade = null),
            (this.ninja = null),
            (this.p2 = null);
        },
      }),
      (t.Physics.prototype.constructor = t.Physics),
      (t.Physics.Arcade = function (e) {
        (this.game = e),
          (this.gravity = new t.Point()),
          (this.bounds = new t.Rectangle(0, 0, e.world.width, e.world.height)),
          (this.checkCollision = { up: !0, down: !0, left: !0, right: !0 }),
          (this.maxObjects = 10),
          (this.maxLevels = 4),
          (this.OVERLAP_BIAS = 4),
          (this.TILE_BIAS = 16),
          (this.forceX = !1),
          (this.quadTree = new t.QuadTree(
            this.game.world.bounds.x,
            this.game.world.bounds.y,
            this.game.world.bounds.width,
            this.game.world.bounds.height,
            this.maxObjects,
            this.maxLevels
          )),
          (this._overlap = 0),
          (this._maxOverlap = 0),
          (this._velocity1 = 0),
          (this._velocity2 = 0),
          (this._newVelocity1 = 0),
          (this._newVelocity2 = 0),
          (this._average = 0),
          (this._mapData = []),
          (this._result = !1),
          (this._total = 0),
          (this._angle = 0),
          (this._dx = 0),
          (this._dy = 0);
      }),
      (t.Physics.Arcade.prototype.constructor = t.Physics.Arcade),
      (t.Physics.Arcade.prototype = {
        setBounds: function (e, t, n, r) {
          this.bounds.setTo(e, t, n, r);
        },
        setBoundsToWorld: function () {
          this.bounds.setTo(
            this.game.world.bounds.x,
            this.game.world.bounds.y,
            this.game.world.bounds.width,
            this.game.world.bounds.height
          );
        },
        enable: function (e, n) {
          "undefined" == typeof n && (n = !0);
          var r = 1;
          if (Array.isArray(e))
            for (r = e.length; r--; )
              e[r] instanceof t.Group
                ? this.enable(e[r].children, n)
                : (this.enableBody(e[r]),
                  n &&
                    e[r].hasOwnProperty("children") &&
                    e[r].children.length > 0 &&
                    this.enable(e[r], !0));
          else
            e instanceof t.Group
              ? this.enable(e.children, n)
              : (this.enableBody(e),
                n &&
                  e.hasOwnProperty("children") &&
                  e.children.length > 0 &&
                  this.enable(e.children, !0));
        },
        enableBody: function (e) {
          e.hasOwnProperty("body") &&
            null === e.body &&
            (e.body = new t.Physics.Arcade.Body(e));
        },
        updateMotion: function (e) {
          (this._velocityDelta =
            this.computeVelocity(
              0,
              e,
              e.angularVelocity,
              e.angularAcceleration,
              e.angularDrag,
              e.maxAngular
            ) - e.angularVelocity),
            (e.angularVelocity += this._velocityDelta),
            (e.rotation += e.angularVelocity * this.game.time.physicsElapsed),
            (e.velocity.x = this.computeVelocity(
              1,
              e,
              e.velocity.x,
              e.acceleration.x,
              e.drag.x,
              e.maxVelocity.x
            )),
            (e.velocity.y = this.computeVelocity(
              2,
              e,
              e.velocity.y,
              e.acceleration.y,
              e.drag.y,
              e.maxVelocity.y
            ));
        },
        computeVelocity: function (e, t, n, r, i, s) {
          return (
            (s = s || 1e4),
            1 == e && t.allowGravity
              ? (n +=
                  (this.gravity.x + t.gravity.x) *
                  this.game.time.physicsElapsed)
              : 2 == e &&
                t.allowGravity &&
                (n +=
                  (this.gravity.y + t.gravity.y) *
                  this.game.time.physicsElapsed),
            r
              ? (n += r * this.game.time.physicsElapsed)
              : i &&
                ((this._drag = i * this.game.time.physicsElapsed),
                n - this._drag > 0
                  ? (n -= this._drag)
                  : n + this._drag < 0
                  ? (n += this._drag)
                  : (n = 0)),
            n > s ? (n = s) : -s > n && (n = -s),
            n
          );
        },
        overlap: function (e, t, n, r, i) {
          if (
            ((n = n || null),
            (r = r || null),
            (i = i || n),
            (this._result = !1),
            (this._total = 0),
            Array.isArray(t))
          )
            for (var s = 0, o = t.length; o > s; s++)
              this.collideHandler(e, t[s], n, r, i, !0);
          else this.collideHandler(e, t, n, r, i, !0);
          return this._total > 0;
        },
        collide: function (e, t, n, r, i) {
          if (
            ((n = n || null),
            (r = r || null),
            (i = i || n),
            (this._result = !1),
            (this._total = 0),
            Array.isArray(t))
          )
            for (var s = 0, o = t.length; o > s; s++)
              this.collideHandler(e, t[s], n, r, i, !1);
          else this.collideHandler(e, t, n, r, i, !1);
          return this._total > 0;
        },
        collideHandler: function (e, n, r, i, s, o) {
          return "undefined" != typeof n ||
            (e.type !== t.GROUP && e.type !== t.EMITTER)
            ? void (
                e &&
                n &&
                e.exists &&
                n.exists &&
                (e.type == t.SPRITE || e.type == t.TILESPRITE
                  ? n.type == t.SPRITE || n.type == t.TILESPRITE
                    ? this.collideSpriteVsSprite(e, n, r, i, s, o)
                    : n.type == t.GROUP || n.type == t.EMITTER
                    ? this.collideSpriteVsGroup(e, n, r, i, s, o)
                    : n.type == t.TILEMAPLAYER &&
                      this.collideSpriteVsTilemapLayer(e, n, r, i, s)
                  : e.type == t.GROUP
                  ? n.type == t.SPRITE || n.type == t.TILESPRITE
                    ? this.collideSpriteVsGroup(n, e, r, i, s, o)
                    : n.type == t.GROUP || n.type == t.EMITTER
                    ? this.collideGroupVsGroup(e, n, r, i, s, o)
                    : n.type == t.TILEMAPLAYER &&
                      this.collideGroupVsTilemapLayer(e, n, r, i, s)
                  : e.type == t.TILEMAPLAYER
                  ? n.type == t.SPRITE || n.type == t.TILESPRITE
                    ? this.collideSpriteVsTilemapLayer(n, e, r, i, s)
                    : (n.type == t.GROUP || n.type == t.EMITTER) &&
                      this.collideGroupVsTilemapLayer(n, e, r, i, s)
                  : e.type == t.EMITTER &&
                    (n.type == t.SPRITE || n.type == t.TILESPRITE
                      ? this.collideSpriteVsGroup(n, e, r, i, s, o)
                      : n.type == t.GROUP || n.type == t.EMITTER
                      ? this.collideGroupVsGroup(e, n, r, i, s, o)
                      : n.type == t.TILEMAPLAYER &&
                        this.collideGroupVsTilemapLayer(e, n, r, i, s)))
              )
            : void this.collideGroupVsSelf(e, r, i, s, o);
        },
        collideSpriteVsSprite: function (e, t, n, r, i, s) {
          return e.body && t.body
            ? (this.separate(e.body, t.body, r, i, s) &&
                (n && n.call(i, e, t), this._total++),
              !0)
            : !1;
        },
        collideSpriteVsGroup: function (e, t, n, r, i, s) {
          if (0 !== t.length) {
            this.quadTree.clear(),
              this.quadTree.reset(
                this.game.world.bounds.x,
                this.game.world.bounds.y,
                this.game.world.bounds.width,
                this.game.world.bounds.height,
                this.maxObjects,
                this.maxLevels
              ),
              this.quadTree.populate(t),
              (this._potentials = this.quadTree.retrieve(e));
            for (var o = 0, u = this._potentials.length; u > o; o++)
              this.separate(e.body, this._potentials[o], r, i, s) &&
                (n && n.call(i, e, this._potentials[o].sprite), this._total++);
          }
        },
        collideGroupVsSelf: function (e, t, n, r, i) {
          if (0 !== e.length)
            for (var s = e.children.length, o = 0; s > o; o++)
              for (var u = o + 1; s >= u; u++)
                e.children[o] &&
                  e.children[u] &&
                  e.children[o].exists &&
                  e.children[u].exists &&
                  this.collideSpriteVsSprite(
                    e.children[o],
                    e.children[u],
                    t,
                    n,
                    r,
                    i
                  );
        },
        collideGroupVsGroup: function (e, t, n, r, i, s) {
          if (0 !== e.length && 0 !== t.length)
            for (var o = 0, u = e.children.length; u > o; o++)
              e.children[o].exists &&
                this.collideSpriteVsGroup(e.children[o], t, n, r, i, s);
        },
        collideSpriteVsTilemapLayer: function (e, t, n, r, i) {
          if (
            ((this._mapData = t.getTiles(
              e.body.position.x - e.body.tilePadding.x,
              e.body.position.y - e.body.tilePadding.y,
              e.body.width + e.body.tilePadding.x,
              e.body.height + e.body.tilePadding.y,
              !1,
              !1
            )),
            0 !== this._mapData.length)
          )
            for (var s = 0; s < this._mapData.length; s++)
              this.separateTile(s, e.body, this._mapData[s]) &&
                (r
                  ? r.call(i, e, this._mapData[s]) &&
                    (this._total++, n && n.call(i, e, this._mapData[s]))
                  : (this._total++, n && n.call(i, e, this._mapData[s])));
        },
        collideGroupVsTilemapLayer: function (e, t, n, r, i) {
          if (0 !== e.length)
            for (var s = 0, o = e.children.length; o > s; s++)
              e.children[s].exists &&
                this.collideSpriteVsTilemapLayer(e.children[s], t, n, r, i);
        },
        separate: function (e, t, n, r, i) {
          return this.intersects(e, t)
            ? n && n.call(r, e.sprite, t.sprite) === !1
              ? !1
              : i
              ? !0
              : ((this._result =
                  this.forceX ||
                  Math.abs(this.gravity.y + e.gravity.y) <
                    Math.abs(this.gravity.x + e.gravity.x)
                    ? this.separateX(e, t, i) || this.separateY(e, t, i)
                    : this.separateY(e, t, i) || this.separateX(e, t, i)),
                this._result)
            : !1;
        },
        intersects: function (e, t) {
          return e.right <= t.position.x
            ? !1
            : e.bottom <= t.position.y
            ? !1
            : e.position.x >= t.right
            ? !1
            : e.position.y >= t.bottom
            ? !1
            : !0;
        },
        separateX: function (e, t, n) {
          return e.immovable && t.immovable
            ? !1
            : ((this._overlap = 0),
              this.intersects(e, t) &&
              ((this._maxOverlap =
                e.deltaAbsX() + t.deltaAbsX() + this.OVERLAP_BIAS),
              0 === e.deltaX() && 0 === t.deltaX()
                ? ((e.embedded = !0), (t.embedded = !0))
                : e.deltaX() > t.deltaX()
                ? ((this._overlap = e.right - t.x),
                  this._overlap > this._maxOverlap ||
                  e.checkCollision.right === !1 ||
                  t.checkCollision.left === !1
                    ? (this._overlap = 0)
                    : ((e.touching.none = !1),
                      (e.touching.right = !0),
                      (t.touching.none = !1),
                      (t.touching.left = !0)))
                : e.deltaX() < t.deltaX() &&
                  ((this._overlap = e.x - t.width - t.x),
                  -this._overlap > this._maxOverlap ||
                  e.checkCollision.left === !1 ||
                  t.checkCollision.right === !1
                    ? (this._overlap = 0)
                    : ((e.touching.none = !1),
                      (e.touching.left = !0),
                      (t.touching.none = !1),
                      (t.touching.right = !0))),
              0 !== this._overlap)
                ? ((e.overlapX = this._overlap),
                  (t.overlapX = this._overlap),
                  n || e.customSeparateX || t.customSeparateX
                    ? !0
                    : ((this._velocity1 = e.velocity.x),
                      (this._velocity2 = t.velocity.x),
                      e.immovable || t.immovable
                        ? e.immovable
                          ? t.immovable ||
                            ((t.x += this._overlap),
                            (t.velocity.x =
                              this._velocity1 - this._velocity2 * t.bounce.x))
                          : ((e.x = e.x - this._overlap),
                            (e.velocity.x =
                              this._velocity2 - this._velocity1 * e.bounce.x))
                        : ((this._overlap *= 0.5),
                          (e.x = e.x - this._overlap),
                          (t.x += this._overlap),
                          (this._newVelocity1 =
                            Math.sqrt(
                              (this._velocity2 * this._velocity2 * t.mass) /
                                e.mass
                            ) * (this._velocity2 > 0 ? 1 : -1)),
                          (this._newVelocity2 =
                            Math.sqrt(
                              (this._velocity1 * this._velocity1 * e.mass) /
                                t.mass
                            ) * (this._velocity1 > 0 ? 1 : -1)),
                          (this._average =
                            0.5 * (this._newVelocity1 + this._newVelocity2)),
                          (this._newVelocity1 -= this._average),
                          (this._newVelocity2 -= this._average),
                          (e.velocity.x =
                            this._average + this._newVelocity1 * e.bounce.x),
                          (t.velocity.x =
                            this._average + this._newVelocity2 * t.bounce.x)),
                      !0))
                : !1);
        },
        separateY: function (e, t, n) {
          return e.immovable && t.immovable
            ? !1
            : ((this._overlap = 0),
              this.intersects(e, t) &&
              ((this._maxOverlap =
                e.deltaAbsY() + t.deltaAbsY() + this.OVERLAP_BIAS),
              0 === e.deltaY() && 0 === t.deltaY()
                ? ((e.embedded = !0), (t.embedded = !0))
                : e.deltaY() > t.deltaY()
                ? ((this._overlap = e.bottom - t.y),
                  this._overlap > this._maxOverlap ||
                  e.checkCollision.down === !1 ||
                  t.checkCollision.up === !1
                    ? (this._overlap = 0)
                    : ((e.touching.none = !1),
                      (e.touching.down = !0),
                      (t.touching.none = !1),
                      (t.touching.up = !0)))
                : e.deltaY() < t.deltaY() &&
                  ((this._overlap = e.y - t.bottom),
                  -this._overlap > this._maxOverlap ||
                  e.checkCollision.up === !1 ||
                  t.checkCollision.down === !1
                    ? (this._overlap = 0)
                    : ((e.touching.none = !1),
                      (e.touching.up = !0),
                      (t.touching.none = !1),
                      (t.touching.down = !0))),
              0 !== this._overlap)
                ? ((e.overlapY = this._overlap),
                  (t.overlapY = this._overlap),
                  n || e.customSeparateY || t.customSeparateY
                    ? !0
                    : ((this._velocity1 = e.velocity.y),
                      (this._velocity2 = t.velocity.y),
                      e.immovable || t.immovable
                        ? e.immovable
                          ? t.immovable ||
                            ((t.y += this._overlap),
                            (t.velocity.y =
                              this._velocity1 - this._velocity2 * t.bounce.y),
                            e.moves && (t.x += e.x - e.prev.x))
                          : ((e.y = e.y - this._overlap),
                            (e.velocity.y =
                              this._velocity2 - this._velocity1 * e.bounce.y),
                            t.moves && (e.x += t.x - t.prev.x))
                        : ((this._overlap *= 0.5),
                          (e.y = e.y - this._overlap),
                          (t.y += this._overlap),
                          (this._newVelocity1 =
                            Math.sqrt(
                              (this._velocity2 * this._velocity2 * t.mass) /
                                e.mass
                            ) * (this._velocity2 > 0 ? 1 : -1)),
                          (this._newVelocity2 =
                            Math.sqrt(
                              (this._velocity1 * this._velocity1 * e.mass) /
                                t.mass
                            ) * (this._velocity1 > 0 ? 1 : -1)),
                          (this._average =
                            0.5 * (this._newVelocity1 + this._newVelocity2)),
                          (this._newVelocity1 -= this._average),
                          (this._newVelocity2 -= this._average),
                          (e.velocity.y =
                            this._average + this._newVelocity1 * e.bounce.y),
                          (t.velocity.y =
                            this._average + this._newVelocity2 * t.bounce.y)),
                      !0))
                : !1);
        },
        separateTile: function (e, t, n) {
          if (!n.intersects(t.position.x, t.position.y, t.right, t.bottom))
            return !1;
          if (
            n.collisionCallback &&
            !n.collisionCallback.call(n.collisionCallbackContext, t.sprite, n)
          )
            return !1;
          if (
            n.layer.callbacks[n.index] &&
            !n.layer.callbacks[n.index].callback.call(
              n.layer.callbacks[n.index].callbackContext,
              t.sprite,
              n
            )
          )
            return !1;
          if (!(n.faceLeft || n.faceRight || n.faceTop || n.faceBottom))
            return !1;
          var r = 0,
            i = 0,
            s = 0,
            o = 1;
          if (
            (t.deltaAbsX() > t.deltaAbsY()
              ? (s = -1)
              : t.deltaAbsX() < t.deltaAbsY() && (o = -1),
            0 !== t.deltaX() &&
              0 !== t.deltaY() &&
              (n.faceLeft || n.faceRight) &&
              (n.faceTop || n.faceBottom) &&
              ((s = Math.min(
                Math.abs(t.position.x - n.right),
                Math.abs(t.right - n.left)
              )),
              (o = Math.min(
                Math.abs(t.position.y - n.bottom),
                Math.abs(t.bottom - n.top)
              ))),
            o > s)
          ) {
            if (
              (n.faceLeft || n.faceRight) &&
              ((r = this.tileCheckX(t, n)),
              0 !== r &&
                !n.intersects(t.position.x, t.position.y, t.right, t.bottom))
            )
              return !0;
            (n.faceTop || n.faceBottom) && (i = this.tileCheckY(t, n));
          } else {
            if (
              (n.faceTop || n.faceBottom) &&
              ((i = this.tileCheckY(t, n)),
              0 !== i &&
                !n.intersects(t.position.x, t.position.y, t.right, t.bottom))
            )
              return !0;
            (n.faceLeft || n.faceRight) && (r = this.tileCheckX(t, n));
          }
          return 0 !== r || 0 !== i;
        },
        tileCheckX: function (e, t) {
          var n = 0;
          return (
            e.deltaX() < 0 &&
            !e.blocked.left &&
            t.collideRight &&
            e.checkCollision.left
              ? t.faceRight &&
                e.x < t.right &&
                ((n = e.x - t.right), n < -this.TILE_BIAS && (n = 0))
              : e.deltaX() > 0 &&
                !e.blocked.right &&
                t.collideLeft &&
                e.checkCollision.right &&
                t.faceLeft &&
                e.right > t.left &&
                ((n = e.right - t.left), n > this.TILE_BIAS && (n = 0)),
            0 !== n && this.processTileSeparationX(e, n),
            n
          );
        },
        tileCheckY: function (e, t) {
          var n = 0;
          return (
            e.deltaY() < 0 &&
            !e.blocked.up &&
            t.collideDown &&
            e.checkCollision.up
              ? t.faceBottom &&
                e.y < t.bottom &&
                ((n = e.y - t.bottom), n < -this.TILE_BIAS && (n = 0))
              : e.deltaY() > 0 &&
                !e.blocked.down &&
                t.collideUp &&
                e.checkCollision.down &&
                t.faceTop &&
                e.bottom > t.top &&
                ((n = e.bottom - t.top), n > this.TILE_BIAS && (n = 0)),
            0 !== n && this.processTileSeparationY(e, n),
            n
          );
        },
        processTileSeparationX: function (e, t) {
          0 > t ? (e.blocked.left = !0) : t > 0 && (e.blocked.right = !0),
            (e.position.x -= t),
            (e.velocity.x = 0 === e.bounce.x ? 0 : -e.velocity.x * e.bounce.x);
        },
        processTileSeparationY: function (e, t) {
          0 > t ? (e.blocked.up = !0) : t > 0 && (e.blocked.down = !0),
            (e.position.y -= t),
            (e.velocity.y = 0 === e.bounce.y ? 0 : -e.velocity.y * e.bounce.y);
        },
        moveToObject: function (e, t, n, r) {
          return (
            "undefined" == typeof n && (n = 60),
            "undefined" == typeof r && (r = 0),
            (this._angle = Math.atan2(t.y - e.y, t.x - e.x)),
            r > 0 && (n = this.distanceBetween(e, t) / (r / 1e3)),
            (e.body.velocity.x = Math.cos(this._angle) * n),
            (e.body.velocity.y = Math.sin(this._angle) * n),
            this._angle
          );
        },
        moveToPointer: function (e, t, n, r) {
          return (
            "undefined" == typeof t && (t = 60),
            (n = n || this.game.input.activePointer),
            "undefined" == typeof r && (r = 0),
            (this._angle = this.angleToPointer(e, n)),
            r > 0 && (t = this.distanceToPointer(e, n) / (r / 1e3)),
            (e.body.velocity.x = Math.cos(this._angle) * t),
            (e.body.velocity.y = Math.sin(this._angle) * t),
            this._angle
          );
        },
        moveToXY: function (e, t, n, r, i) {
          return (
            "undefined" == typeof r && (r = 60),
            "undefined" == typeof i && (i = 0),
            (this._angle = Math.atan2(n - e.y, t - e.x)),
            i > 0 && (r = this.distanceToXY(e, t, n) / (i / 1e3)),
            (e.body.velocity.x = Math.cos(this._angle) * r),
            (e.body.velocity.y = Math.sin(this._angle) * r),
            this._angle
          );
        },
        velocityFromAngle: function (e, n, r) {
          return (
            "undefined" == typeof n && (n = 60),
            (r = r || new t.Point()),
            r.setTo(
              Math.cos(this.game.math.degToRad(e)) * n,
              Math.sin(this.game.math.degToRad(e)) * n
            )
          );
        },
        velocityFromRotation: function (e, n, r) {
          return (
            "undefined" == typeof n && (n = 60),
            (r = r || new t.Point()),
            r.setTo(Math.cos(e) * n, Math.sin(e) * n)
          );
        },
        accelerationFromRotation: function (e, n, r) {
          return (
            "undefined" == typeof n && (n = 60),
            (r = r || new t.Point()),
            r.setTo(Math.cos(e) * n, Math.sin(e) * n)
          );
        },
        accelerateToObject: function (e, t, n, r, i) {
          return (
            "undefined" == typeof n && (n = 60),
            "undefined" == typeof r && (r = 1e3),
            "undefined" == typeof i && (i = 1e3),
            (this._angle = this.angleBetween(e, t)),
            e.body.acceleration.setTo(
              Math.cos(this._angle) * n,
              Math.sin(this._angle) * n
            ),
            e.body.maxVelocity.setTo(r, i),
            this._angle
          );
        },
        accelerateToPointer: function (e, t, n, r, i) {
          return (
            "undefined" == typeof n && (n = 60),
            "undefined" == typeof t && (t = this.game.input.activePointer),
            "undefined" == typeof r && (r = 1e3),
            "undefined" == typeof i && (i = 1e3),
            (this._angle = this.angleToPointer(e, t)),
            e.body.acceleration.setTo(
              Math.cos(this._angle) * n,
              Math.sin(this._angle) * n
            ),
            e.body.maxVelocity.setTo(r, i),
            this._angle
          );
        },
        accelerateToXY: function (e, t, n, r, i, s) {
          return (
            "undefined" == typeof r && (r = 60),
            "undefined" == typeof i && (i = 1e3),
            "undefined" == typeof s && (s = 1e3),
            (this._angle = this.angleToXY(e, t, n)),
            e.body.acceleration.setTo(
              Math.cos(this._angle) * r,
              Math.sin(this._angle) * r
            ),
            e.body.maxVelocity.setTo(i, s),
            this._angle
          );
        },
        distanceBetween: function (e, t) {
          return (
            (this._dx = e.x - t.x),
            (this._dy = e.y - t.y),
            Math.sqrt(this._dx * this._dx + this._dy * this._dy)
          );
        },
        distanceToXY: function (e, t, n) {
          return (
            (this._dx = e.x - t),
            (this._dy = e.y - n),
            Math.sqrt(this._dx * this._dx + this._dy * this._dy)
          );
        },
        distanceToPointer: function (e, t) {
          return (
            (t = t || this.game.input.activePointer),
            (this._dx = e.x - t.x),
            (this._dy = e.y - t.y),
            Math.sqrt(this._dx * this._dx + this._dy * this._dy)
          );
        },
        angleBetween: function (e, t) {
          return (
            (this._dx = t.x - e.x),
            (this._dy = t.y - e.y),
            Math.atan2(this._dy, this._dx)
          );
        },
        angleToXY: function (e, t, n) {
          return (
            (this._dx = t - e.x),
            (this._dy = n - e.y),
            Math.atan2(this._dy, this._dx)
          );
        },
        angleToPointer: function (e, t) {
          return (
            (t = t || this.game.input.activePointer),
            (this._dx = t.worldX - e.x),
            (this._dy = t.worldY - e.y),
            Math.atan2(this._dy, this._dx)
          );
        },
      }),
      (t.Physics.Arcade.Body = function (e) {
        (this.sprite = e),
          (this.game = e.game),
          (this.type = t.Physics.ARCADE),
          (this.offset = new t.Point()),
          (this.position = new t.Point(e.x, e.y)),
          (this.prev = new t.Point(this.position.x, this.position.y)),
          (this.allowRotation = !0),
          (this.rotation = e.rotation),
          (this.preRotation = e.rotation),
          (this.sourceWidth = e.texture.frame.width),
          (this.sourceHeight = e.texture.frame.height),
          (this.width = e.width),
          (this.height = e.height),
          (this.halfWidth = Math.abs(e.width / 2)),
          (this.halfHeight = Math.abs(e.height / 2)),
          (this.center = new t.Point(
            e.x + this.halfWidth,
            e.y + this.halfHeight
          )),
          (this.velocity = new t.Point()),
          (this.newVelocity = new t.Point(0, 0)),
          (this.deltaMax = new t.Point(0, 0)),
          (this.acceleration = new t.Point()),
          (this.drag = new t.Point()),
          (this.allowGravity = !0),
          (this.gravity = new t.Point(0, 0)),
          (this.bounce = new t.Point()),
          (this.maxVelocity = new t.Point(1e4, 1e4)),
          (this.angularVelocity = 0),
          (this.angularAcceleration = 0),
          (this.angularDrag = 0),
          (this.maxAngular = 1e3),
          (this.mass = 1),
          (this.angle = 0),
          (this.speed = 0),
          (this.facing = t.NONE),
          (this.immovable = !1),
          (this.moves = !0),
          (this.customSeparateX = !1),
          (this.customSeparateY = !1),
          (this.overlapX = 0),
          (this.overlapY = 0),
          (this.embedded = !1),
          (this.collideWorldBounds = !1),
          (this.checkCollision = {
            none: !1,
            any: !0,
            up: !0,
            down: !0,
            left: !0,
            right: !0,
          }),
          (this.touching = { none: !0, up: !1, down: !1, left: !1, right: !1 }),
          (this.wasTouching = {
            none: !0,
            up: !1,
            down: !1,
            left: !1,
            right: !1,
          }),
          (this.blocked = { up: !1, down: !1, left: !1, right: !1 }),
          (this.tilePadding = new t.Point()),
          (this.phase = 0),
          (this._reset = !0),
          (this._sx = e.scale.x),
          (this._sy = e.scale.y),
          (this._dx = 0),
          (this._dy = 0);
      }),
      (t.Physics.Arcade.Body.prototype = {
        updateBounds: function () {
          var e = Math.abs(this.sprite.scale.x),
            t = Math.abs(this.sprite.scale.y);
          (e !== this._sx || t !== this._sy) &&
            ((this.width = this.sourceWidth * e),
            (this.height = this.sourceHeight * t),
            (this.halfWidth = Math.floor(this.width / 2)),
            (this.halfHeight = Math.floor(this.height / 2)),
            (this._sx = e),
            (this._sy = t),
            this.center.setTo(
              this.position.x + this.halfWidth,
              this.position.y + this.halfHeight
            ),
            (this._reset = !0));
        },
        preUpdate: function () {
          (this.phase = 1),
            (this.wasTouching.none = this.touching.none),
            (this.wasTouching.up = this.touching.up),
            (this.wasTouching.down = this.touching.down),
            (this.wasTouching.left = this.touching.left),
            (this.wasTouching.right = this.touching.right),
            (this.touching.none = !0),
            (this.touching.up = !1),
            (this.touching.down = !1),
            (this.touching.left = !1),
            (this.touching.right = !1),
            (this.blocked.up = !1),
            (this.blocked.down = !1),
            (this.blocked.left = !1),
            (this.blocked.right = !1),
            (this.embedded = !1),
            this.updateBounds(),
            (this.position.x =
              this.sprite.world.x -
              this.sprite.anchor.x * this.width +
              this.offset.x),
            (this.position.y =
              this.sprite.world.y -
              this.sprite.anchor.y * this.height +
              this.offset.y),
            (this.rotation = this.sprite.angle),
            (this.preRotation = this.rotation),
            (this._reset || 1 === this.sprite._cache[4]) &&
              ((this.prev.x = this.position.x),
              (this.prev.y = this.position.y)),
            this.moves &&
              (this.game.physics.arcade.updateMotion(this),
              this.newVelocity.set(
                this.velocity.x * this.game.time.physicsElapsed,
                this.velocity.y * this.game.time.physicsElapsed
              ),
              (this.position.x += this.newVelocity.x),
              (this.position.y += this.newVelocity.y),
              (this.position.x !== this.prev.x ||
                this.position.y !== this.prev.y) &&
                ((this.speed = Math.sqrt(
                  this.velocity.x * this.velocity.x +
                    this.velocity.y * this.velocity.y
                )),
                (this.angle = Math.atan2(this.velocity.y, this.velocity.x))),
              this.collideWorldBounds && this.checkWorldBounds()),
            (this._dx = this.deltaX()),
            (this._dy = this.deltaY()),
            (this._reset = !1);
        },
        postUpdate: function () {
          (this.phase = 2),
            this.deltaX() < 0
              ? (this.facing = t.LEFT)
              : this.deltaX() > 0 && (this.facing = t.RIGHT),
            this.deltaY() < 0
              ? (this.facing = t.UP)
              : this.deltaY() > 0 && (this.facing = t.DOWN),
            this.moves &&
              ((this._dx = this.deltaX()),
              (this._dy = this.deltaY()),
              0 !== this.deltaMax.x &&
                0 !== this._dx &&
                (this._dx < 0 && this._dx < -this.deltaMax.x
                  ? (this._dx = -this.deltaMax.x)
                  : this._dx > 0 &&
                    this._dx > this.deltaMax.x &&
                    (this._dx = this.deltaMax.x)),
              0 !== this.deltaMax.y &&
                0 !== this._dy &&
                (this._dy < 0 && this._dy < -this.deltaMax.y
                  ? (this._dy = -this.deltaMax.y)
                  : this._dy > 0 &&
                    this._dy > this.deltaMax.y &&
                    (this._dy = this.deltaMax.y)),
              (this.sprite.x += this._dx),
              (this.sprite.y += this._dy)),
            this.center.setTo(
              this.position.x + this.halfWidth,
              this.position.y + this.halfHeight
            ),
            this.allowRotation && (this.sprite.angle += this.deltaZ()),
            (this.prev.x = this.position.x),
            (this.prev.y = this.position.y);
        },
        destroy: function () {
          this.sprite = null;
        },
        checkWorldBounds: function () {
          this.position.x < this.game.physics.arcade.bounds.x &&
          this.game.physics.arcade.checkCollision.left
            ? ((this.position.x = this.game.physics.arcade.bounds.x),
              (this.velocity.x *= -this.bounce.x),
              (this.blocked.left = !0))
            : this.right > this.game.physics.arcade.bounds.right &&
              this.game.physics.arcade.checkCollision.right &&
              ((this.position.x =
                this.game.physics.arcade.bounds.right - this.width),
              (this.velocity.x *= -this.bounce.x),
              (this.blocked.right = !0)),
            this.position.y < this.game.physics.arcade.bounds.y &&
            this.game.physics.arcade.checkCollision.up
              ? ((this.position.y = this.game.physics.arcade.bounds.y),
                (this.velocity.y *= -this.bounce.y),
                (this.blocked.up = !0))
              : this.bottom > this.game.physics.arcade.bounds.bottom &&
                this.game.physics.arcade.checkCollision.down &&
                ((this.position.y =
                  this.game.physics.arcade.bounds.bottom - this.height),
                (this.velocity.y *= -this.bounce.y),
                (this.blocked.down = !0));
        },
        setSize: function (e, t, n, r) {
          (n = n || this.offset.x),
            (r = r || this.offset.y),
            (this.sourceWidth = e),
            (this.sourceHeight = t),
            (this.width = this.sourceWidth * this._sx),
            (this.height = this.sourceHeight * this._sy),
            (this.halfWidth = Math.floor(this.width / 2)),
            (this.halfHeight = Math.floor(this.height / 2)),
            this.offset.setTo(n, r),
            this.center.setTo(
              this.position.x + this.halfWidth,
              this.position.y + this.halfHeight
            );
        },
        reset: function (e, t) {
          this.velocity.set(0),
            this.acceleration.set(0),
            (this.angularVelocity = 0),
            (this.angularAcceleration = 0),
            (this.position.x =
              e - this.sprite.anchor.x * this.width + this.offset.x),
            (this.position.y =
              t - this.sprite.anchor.y * this.height + this.offset.y),
            (this.prev.x = this.position.x),
            (this.prev.y = this.position.y),
            (this.rotation = this.sprite.angle),
            (this.preRotation = this.rotation),
            (this._sx = this.sprite.scale.x),
            (this._sy = this.sprite.scale.y),
            this.center.setTo(
              this.position.x + this.halfWidth,
              this.position.y + this.halfHeight
            );
        },
        onFloor: function () {
          return this.blocked.down;
        },
        onWall: function () {
          return this.blocked.left || this.blocked.right;
        },
        deltaAbsX: function () {
          return this.deltaX() > 0 ? this.deltaX() : -this.deltaX();
        },
        deltaAbsY: function () {
          return this.deltaY() > 0 ? this.deltaY() : -this.deltaY();
        },
        deltaX: function () {
          return this.position.x - this.prev.x;
        },
        deltaY: function () {
          return this.position.y - this.prev.y;
        },
        deltaZ: function () {
          return this.rotation - this.preRotation;
        },
      }),
      Object.defineProperty(t.Physics.Arcade.Body.prototype, "bottom", {
        get: function () {
          return this.position.y + this.height;
        },
      }),
      Object.defineProperty(t.Physics.Arcade.Body.prototype, "right", {
        get: function () {
          return this.position.x + this.width;
        },
      }),
      Object.defineProperty(t.Physics.Arcade.Body.prototype, "x", {
        get: function () {
          return this.position.x;
        },
        set: function (e) {
          this.position.x = e;
        },
      }),
      Object.defineProperty(t.Physics.Arcade.Body.prototype, "y", {
        get: function () {
          return this.position.y;
        },
        set: function (e) {
          this.position.y = e;
        },
      }),
      (t.Physics.Arcade.Body.render = function (e, t, n, r) {
        "undefined" == typeof n && (n = !0),
          (r = r || "rgba(0,255,0,0.4)"),
          n
            ? ((e.fillStyle = r),
              e.fillRect(
                t.position.x - t.game.camera.x,
                t.position.y - t.game.camera.y,
                t.width,
                t.height
              ))
            : ((e.strokeStyle = r),
              e.strokeRect(
                t.position.x - t.game.camera.x,
                t.position.y - t.game.camera.y,
                t.width,
                t.height
              ));
      }),
      (t.Physics.Arcade.Body.renderBodyInfo = function (e, t) {
        e.line(
          "x: " + t.x.toFixed(2),
          "y: " + t.y.toFixed(2),
          "width: " + t.width,
          "height: " + t.height
        ),
          e.line(
            "velocity x: " + t.velocity.x.toFixed(2),
            "y: " + t.velocity.y.toFixed(2),
            "deltaX: " + t._dx.toFixed(2),
            "deltaY: " + t._dy.toFixed(2)
          ),
          e.line(
            "acceleration x: " + t.acceleration.x.toFixed(2),
            "y: " + t.acceleration.y.toFixed(2),
            "speed: " + t.speed.toFixed(2),
            "angle: " + t.angle.toFixed(2)
          ),
          e.line(
            "gravity x: " + t.gravity.x,
            "y: " + t.gravity.y,
            "bounce x: " + t.bounce.x.toFixed(2),
            "y: " + t.bounce.y.toFixed(2)
          ),
          e.line(
            "touching left: " + t.touching.left,
            "right: " + t.touching.right,
            "up: " + t.touching.up,
            "down: " + t.touching.down
          ),
          e.line(
            "blocked left: " + t.blocked.left,
            "right: " + t.blocked.right,
            "up: " + t.blocked.up,
            "down: " + t.blocked.down
          );
      }),
      (t.Physics.Arcade.Body.prototype.constructor = t.Physics.Arcade.Body),
      (t.Particles = function (e) {
        (this.game = e), (this.emitters = {}), (this.ID = 0);
      }),
      (t.Particles.prototype = {
        add: function (e) {
          return (this.emitters[e.name] = e), e;
        },
        remove: function (e) {
          delete this.emitters[e.name];
        },
        update: function () {
          for (var e in this.emitters)
            this.emitters[e].exists && this.emitters[e].update();
        },
      }),
      (t.Particles.prototype.constructor = t.Particles),
      (t.Particles.Arcade = {}),
      (t.Particles.Arcade.Emitter = function (e, n, r, i) {
        (this.maxParticles = i || 50),
          t.Group.call(this, e),
          (this.name = "emitter" + this.game.particles.ID++),
          (this.type = t.EMITTER),
          (this.x = 0),
          (this.y = 0),
          (this.width = 1),
          (this.height = 1),
          (this.minParticleSpeed = new t.Point(-100, -100)),
          (this.maxParticleSpeed = new t.Point(100, 100)),
          (this.minParticleScale = 1),
          (this.maxParticleScale = 1),
          (this.minRotation = -360),
          (this.maxRotation = 360),
          (this.gravity = 100),
          (this.particleClass = t.Sprite),
          (this.particleDrag = new t.Point()),
          (this.angularDrag = 0),
          (this.frequency = 100),
          (this.lifespan = 2e3),
          (this.bounce = new t.Point()),
          (this._quantity = 0),
          (this._timer = 0),
          (this._counter = 0),
          (this._explode = !0),
          (this._frames = null),
          (this.on = !1),
          (this.exists = !0),
          (this.emitX = n),
          (this.emitY = r);
      }),
      (t.Particles.Arcade.Emitter.prototype = Object.create(t.Group.prototype)),
      (t.Particles.Arcade.Emitter.prototype.constructor =
        t.Particles.Arcade.Emitter),
      (t.Particles.Arcade.Emitter.prototype.update = function () {
        if (this.on)
          if (this._explode) {
            this._counter = 0;
            do this.emitParticle(), this._counter++;
            while (this._counter < this._quantity);
            this.on = !1;
          } else
            this.game.time.now >= this._timer &&
              (this.emitParticle(),
              this._counter++,
              this._quantity > 0 &&
                this._counter >= this._quantity &&
                (this.on = !1),
              (this._timer = this.game.time.now + this.frequency));
      }),
      (t.Particles.Arcade.Emitter.prototype.makeParticles = function (
        e,
        t,
        n,
        r,
        i
      ) {
        "undefined" == typeof t && (t = 0),
          "undefined" == typeof n && (n = this.maxParticles),
          "undefined" == typeof r && (r = !1),
          "undefined" == typeof i && (i = !1);
        var s,
          o = 0,
          u = e,
          a = t;
        for (this._frames = t; n > o; )
          "object" == typeof e && (u = this.game.rnd.pick(e)),
            "object" == typeof t && (a = this.game.rnd.pick(t)),
            (s = new this.particleClass(this.game, 0, 0, u, a)),
            this.game.physics.arcade.enable(s, !1),
            r
              ? ((s.body.checkCollision.any = !0),
                (s.body.checkCollision.none = !1))
              : (s.body.checkCollision.none = !0),
            (s.body.collideWorldBounds = i),
            (s.exists = !1),
            (s.visible = !1),
            s.anchor.set(0.5),
            this.add(s),
            o++;
        return this;
      }),
      (t.Particles.Arcade.Emitter.prototype.kill = function () {
        (this.on = !1), (this.alive = !1), (this.exists = !1);
      }),
      (t.Particles.Arcade.Emitter.prototype.revive = function () {
        (this.alive = !0), (this.exists = !0);
      }),
      (t.Particles.Arcade.Emitter.prototype.start = function (e, t, n, r) {
        "undefined" == typeof e && (e = !0),
          "undefined" == typeof t && (t = 0),
          "undefined" == typeof n && (n = 250),
          "undefined" == typeof r && (r = 0),
          this.revive(),
          (this.visible = !0),
          (this.on = !0),
          (this._explode = e),
          (this.lifespan = t),
          (this.frequency = n),
          e ? (this._quantity = r) : (this._quantity += r),
          (this._counter = 0),
          (this._timer = this.game.time.now + n);
      }),
      (t.Particles.Arcade.Emitter.prototype.emitParticle = function () {
        var e = this.getFirstExists(!1);
        null != e &&
          ((e.angle = 0),
          e.bringToTop(),
          (1 !== this.minParticleScale || 1 !== this.maxParticleScale) &&
            e.scale.set(
              this.game.rnd.realInRange(
                this.minParticleScale,
                this.maxParticleScale
              )
            ),
          this.width > 1 || this.height > 1
            ? e.reset(
                this.game.rnd.integerInRange(this.left, this.right),
                this.game.rnd.integerInRange(this.top, this.bottom)
              )
            : e.reset(this.emitX, this.emitY),
          (e.lifespan = this.lifespan),
          e.body.bounce.setTo(this.bounce.x, this.bounce.y),
          (e.body.velocity.x =
            this.minParticleSpeed.x !== this.maxParticleSpeed.x
              ? this.game.rnd.integerInRange(
                  this.minParticleSpeed.x,
                  this.maxParticleSpeed.x
                )
              : this.minParticleSpeed.x),
          (e.body.velocity.y =
            this.minParticleSpeed.y !== this.maxParticleSpeed.y
              ? this.game.rnd.integerInRange(
                  this.minParticleSpeed.y,
                  this.maxParticleSpeed.y
                )
              : this.minParticleSpeed.y),
          this.minRotation !== this.maxRotation
            ? (e.body.angularVelocity = this.game.rnd.integerInRange(
                this.minRotation,
                this.maxRotation
              ))
            : 0 !== this.minRotation &&
              (e.body.angularVelocity = this.minRotation),
          (e.frame =
            "object" == typeof this._frames
              ? this.game.rnd.pick(this._frames)
              : this._frames),
          (e.body.gravity.y = this.gravity),
          (e.body.drag.x = this.particleDrag.x),
          (e.body.drag.y = this.particleDrag.y),
          (e.body.angularDrag = this.angularDrag));
      }),
      (t.Particles.Arcade.Emitter.prototype.setSize = function (e, t) {
        (this.width = e), (this.height = t);
      }),
      (t.Particles.Arcade.Emitter.prototype.setXSpeed = function (e, t) {
        (e = e || 0),
          (t = t || 0),
          (this.minParticleSpeed.x = e),
          (this.maxParticleSpeed.x = t);
      }),
      (t.Particles.Arcade.Emitter.prototype.setYSpeed = function (e, t) {
        (e = e || 0),
          (t = t || 0),
          (this.minParticleSpeed.y = e),
          (this.maxParticleSpeed.y = t);
      }),
      (t.Particles.Arcade.Emitter.prototype.setRotation = function (e, t) {
        (e = e || 0),
          (t = t || 0),
          (this.minRotation = e),
          (this.maxRotation = t);
      }),
      (t.Particles.Arcade.Emitter.prototype.at = function (e) {
        e.center && ((this.emitX = e.center.x), (this.emitY = e.center.y));
      }),
      Object.defineProperty(t.Particles.Arcade.Emitter.prototype, "x", {
        get: function () {
          return this.emitX;
        },
        set: function (e) {
          this.emitX = e;
        },
      }),
      Object.defineProperty(t.Particles.Arcade.Emitter.prototype, "y", {
        get: function () {
          return this.emitY;
        },
        set: function (e) {
          this.emitY = e;
        },
      }),
      Object.defineProperty(t.Particles.Arcade.Emitter.prototype, "left", {
        get: function () {
          return Math.floor(this.x - this.width / 2);
        },
      }),
      Object.defineProperty(t.Particles.Arcade.Emitter.prototype, "right", {
        get: function () {
          return Math.floor(this.x + this.width / 2);
        },
      }),
      Object.defineProperty(t.Particles.Arcade.Emitter.prototype, "top", {
        get: function () {
          return Math.floor(this.y - this.height / 2);
        },
      }),
      Object.defineProperty(t.Particles.Arcade.Emitter.prototype, "bottom", {
        get: function () {
          return Math.floor(this.y + this.height / 2);
        },
      }),
      (t.Tile = function (e, t, n, r, i, s) {
        (this.layer = e),
          (this.index = t),
          (this.x = n),
          (this.y = r),
          (this.worldX = n * i),
          (this.worldY = r * s),
          (this.width = i),
          (this.height = s),
          (this.centerX = Math.abs(i / 2)),
          (this.centerY = Math.abs(s / 2)),
          (this.alpha = 1),
          (this.properties = {}),
          (this.scanned = !1),
          (this.faceTop = !1),
          (this.faceBottom = !1),
          (this.faceLeft = !1),
          (this.faceRight = !1),
          (this.collideLeft = !1),
          (this.collideRight = !1),
          (this.collideUp = !1),
          (this.collideDown = !1),
          (this.collisionCallback = null),
          (this.collisionCallbackContext = this);
      }),
      (t.Tile.prototype = {
        containsPoint: function (e, t) {
          return !(
            e < this.worldX ||
            t < this.worldY ||
            e > this.right ||
            t > this.bottom
          );
        },
        intersects: function (e, t, n, r) {
          return n <= this.worldX
            ? !1
            : r <= this.worldY
            ? !1
            : e >= this.worldX + this.width
            ? !1
            : t >= this.worldY + this.height
            ? !1
            : !0;
        },
        setCollisionCallback: function (e, t) {
          (this.collisionCallback = e), (this.collisionCallbackContext = t);
        },
        destroy: function () {
          (this.collisionCallback = null),
            (this.collisionCallbackContext = null),
            (this.properties = null);
        },
        setCollision: function (e, t, n, r) {
          (this.collideLeft = e),
            (this.collideRight = t),
            (this.collideUp = n),
            (this.collideDown = r);
        },
        resetCollision: function () {
          (this.collideLeft = !1),
            (this.collideRight = !1),
            (this.collideUp = !1),
            (this.collideDown = !1),
            (this.faceTop = !1),
            (this.faceBottom = !1),
            (this.faceLeft = !1),
            (this.faceRight = !1);
        },
        isInteresting: function (e, t) {
          return e && t
            ? this.collideLeft ||
                this.collideRight ||
                this.collideUp ||
                this.collideDown ||
                this.faceTop ||
                this.faceBottom ||
                this.faceLeft ||
                this.faceRight ||
                this.collisionCallback
            : e
            ? this.collideLeft ||
              this.collideRight ||
              this.collideUp ||
              this.collideDown
            : t
            ? this.faceTop || this.faceBottom || this.faceLeft || this.faceRight
            : !1;
        },
        copy: function (e) {
          (this.index = e.index),
            (this.alpha = e.alpha),
            (this.properties = e.properties),
            (this.collideUp = e.collideUp),
            (this.collideDown = e.collideDown),
            (this.collideLeft = e.collideLeft),
            (this.collideRight = e.collideRight),
            (this.collisionCallback = e.collisionCallback),
            (this.collisionCallbackContext = e.collisionCallbackContext);
        },
      }),
      (t.Tile.prototype.constructor = t.Tile),
      Object.defineProperty(t.Tile.prototype, "collides", {
        get: function () {
          return (
            this.collideLeft ||
            this.collideRight ||
            this.collideUp ||
            this.collideDown
          );
        },
      }),
      Object.defineProperty(t.Tile.prototype, "canCollide", {
        get: function () {
          return (
            this.collideLeft ||
            this.collideRight ||
            this.collideUp ||
            this.collideDown ||
            this.collisionCallback
          );
        },
      }),
      Object.defineProperty(t.Tile.prototype, "left", {
        get: function () {
          return this.worldX;
        },
      }),
      Object.defineProperty(t.Tile.prototype, "right", {
        get: function () {
          return this.worldX + this.width;
        },
      }),
      Object.defineProperty(t.Tile.prototype, "top", {
        get: function () {
          return this.worldY;
        },
      }),
      Object.defineProperty(t.Tile.prototype, "bottom", {
        get: function () {
          return this.worldY + this.height;
        },
      }),
      (t.Tilemap = function (e, n, r, i, s, o) {
        (this.game = e), (this.key = n);
        var u = t.TilemapParser.parse(this.game, n, r, i, s, o);
        null !== u &&
          ((this.width = u.width),
          (this.height = u.height),
          (this.tileWidth = u.tileWidth),
          (this.tileHeight = u.tileHeight),
          (this.orientation = u.orientation),
          (this.version = u.version),
          (this.properties = u.properties),
          (this.widthInPixels = u.widthInPixels),
          (this.heightInPixels = u.heightInPixels),
          (this.layers = u.layers),
          (this.tilesets = u.tilesets),
          (this.tiles = u.tiles),
          (this.objects = u.objects),
          (this.collideIndexes = []),
          (this.collision = u.collision),
          (this.images = u.images),
          (this.currentLayer = 0),
          (this.debugMap = []),
          (this._results = []),
          (this._tempA = 0),
          (this._tempB = 0));
      }),
      (t.Tilemap.CSV = 0),
      (t.Tilemap.TILED_JSON = 1),
      (t.Tilemap.prototype = {
        create: function (e, t, n, r, i, s) {
          return (
            "undefined" == typeof s && (s = this.game.world),
            (this.width = t),
            (this.height = n),
            this.setTileSize(r, i),
            (this.layers.length = 0),
            this.createBlankLayer(e, t, n, r, i, s)
          );
        },
        setTileSize: function (e, t) {
          (this.tileWidth = e),
            (this.tileHeight = t),
            (this.widthInPixels = this.width * e),
            (this.heightInPixels = this.height * t);
        },
        addTilesetImage: function (e, n, r, i, s, o, u) {
          if (
            ("undefined" == typeof r && (r = this.tileWidth),
            "undefined" == typeof i && (i = this.tileHeight),
            "undefined" == typeof s && (s = 0),
            "undefined" == typeof o && (o = 0),
            "undefined" == typeof u && (u = 0),
            0 === r && (r = 32),
            0 === i && (i = 32),
            "undefined" == typeof n)
          ) {
            if ("string" != typeof e) return null;
            n = e;
          }
          if (
            ("string" == typeof e && (e = this.getTilesetIndex(e)),
            this.tilesets[e])
          )
            return (
              this.tilesets[e].setImage(this.game.cache.getImage(n)),
              this.tilesets[e]
            );
          var a = new t.Tileset(n, u, r, i, s, o, {});
          a.setImage(this.game.cache.getImage(n)), this.tilesets.push(a);
          for (
            var f = this.tilesets.length - 1,
              l = s,
              c = s,
              h = 0,
              p = 0,
              d = 0,
              v = u;
            v < u + a.total &&
            ((this.tiles[v] = [l, c, f]), (l += r + o), h++, h !== a.total) &&
            (p++,
            p !== a.columns ||
              ((l = s), (c += i + o), (p = 0), d++, d !== a.rows));
            v++
          );
          return a;
        },
        createFromObjects: function (e, n, r, i, s, o, u, a, f) {
          if (
            ("undefined" == typeof s && (s = !0),
            "undefined" == typeof o && (o = !1),
            "undefined" == typeof u && (u = this.game.world),
            "undefined" == typeof a && (a = t.Sprite),
            "undefined" == typeof f && (f = !0),
            !this.objects[e])
          )
            return void console.warn(
              "Tilemap.createFromObjects: Invalid objectgroup name given: " + e
            );
          for (var l, c = 0, h = this.objects[e].length; h > c; c++)
            if (this.objects[e][c].gid === n) {
              (l = new a(
                this.game,
                this.objects[e][c].x,
                this.objects[e][c].y,
                r,
                i
              )),
                (l.name = this.objects[e][c].name),
                (l.visible = this.objects[e][c].visible),
                (l.autoCull = o),
                (l.exists = s),
                f && (l.y -= l.height),
                u.add(l);
              for (var p in this.objects[e][c].properties)
                u.set(l, p, this.objects[e][c].properties[p], !1, !1, 0);
            }
        },
        createLayer: function (e, n, r, i) {
          "undefined" == typeof n && (n = this.game.width),
            "undefined" == typeof r && (r = this.game.height),
            "undefined" == typeof i && (i = this.game.world);
          var s = e;
          return (
            "string" == typeof e && (s = this.getLayerIndex(e)),
            null === s || s > this.layers.length
              ? void console.warn(
                  "Tilemap.createLayer: Invalid layer ID given: " + s
                )
              : i.add(new t.TilemapLayer(this.game, this, s, n, r))
          );
        },
        createBlankLayer: function (e, n, r, i, s, o) {
          if (
            ("undefined" == typeof o && (o = this.game.world),
            null !== this.getLayerIndex(e))
          )
            return void console.warn(
              "Tilemap.createBlankLayer: Layer with matching name already exists"
            );
          for (var u, a = [], f = 0; r > f; f++) {
            u = [];
            for (var l = 0; n > l; l++) u.push(null);
            a.push(u);
          }
          var c = {
            name: e,
            x: 0,
            y: 0,
            width: n,
            height: r,
            widthInPixels: n * i,
            heightInPixels: r * s,
            alpha: 1,
            visible: !0,
            properties: {},
            indexes: [],
            callbacks: [],
            bodies: [],
            data: a,
          };
          this.layers.push(c), (this.currentLayer = this.layers.length - 1);
          var h = c.widthInPixels,
            p = c.heightInPixels;
          h > this.game.width && (h = this.game.width),
            p > this.game.height && (p = this.game.height);
          var a = new t.TilemapLayer(
            this.game,
            this,
            this.layers.length - 1,
            h,
            p
          );
          return (a.name = e), o.add(a);
        },
        getIndex: function (e, t) {
          for (var n = 0; n < e.length; n++) if (e[n].name === t) return n;
          return null;
        },
        getLayerIndex: function (e) {
          return this.getIndex(this.layers, e);
        },
        getTilesetIndex: function (e) {
          return this.getIndex(this.tilesets, e);
        },
        getImageIndex: function (e) {
          return this.getIndex(this.images, e);
        },
        getObjectIndex: function (e) {
          return this.getIndex(this.objects, e);
        },
        setTileIndexCallback: function (e, t, n, r) {
          if (((r = this.getLayer(r)), "number" == typeof e))
            this.layers[r].callbacks[e] = { callback: t, callbackContext: n };
          else
            for (var i = 0, s = e.length; s > i; i++)
              this.layers[r].callbacks[e[i]] = {
                callback: t,
                callbackContext: n,
              };
        },
        setTileLocationCallback: function (e, t, n, r, i, s, o) {
          if (
            ((o = this.getLayer(o)),
            this.copy(e, t, n, r, o),
            !(this._results.length < 2))
          )
            for (var u = 1; u < this._results.length; u++)
              this._results[u].setCollisionCallback(i, s);
        },
        setCollision: function (e, t, n) {
          if (
            ("undefined" == typeof t && (t = !0),
            (n = this.getLayer(n)),
            "number" == typeof e)
          )
            return this.setCollisionByIndex(e, t, n, !0);
          for (var r = 0, i = e.length; i > r; r++)
            this.setCollisionByIndex(e[r], t, n, !1);
          this.calculateFaces(n);
        },
        setCollisionBetween: function (e, t, n, r) {
          if (
            ("undefined" == typeof n && (n = !0),
            (r = this.getLayer(r)),
            !(e > t))
          ) {
            for (var i = e; t >= i; i++) this.setCollisionByIndex(i, n, r, !1);
            this.calculateFaces(r);
          }
        },
        setCollisionByExclusion: function (e, t, n) {
          "undefined" == typeof t && (t = !0), (n = this.getLayer(n));
          for (var r = 0, i = this.tiles.length; i > r; r++)
            -1 === e.indexOf(r) && this.setCollisionByIndex(r, t, n, !1);
          this.calculateFaces(n);
        },
        setCollisionByIndex: function (e, t, n, r) {
          if (
            ("undefined" == typeof t && (t = !0),
            "undefined" == typeof n && (n = this.currentLayer),
            "undefined" == typeof r && (r = !0),
            t)
          )
            this.collideIndexes.push(e);
          else {
            var i = this.collideIndexes.indexOf(e);
            i > -1 && this.collideIndexes.splice(i, 1);
          }
          for (var s = 0; s < this.layers[n].height; s++)
            for (var o = 0; o < this.layers[n].width; o++) {
              var u = this.layers[n].data[s][o];
              u &&
                u.index === e &&
                (t ? u.setCollision(!0, !0, !0, !0) : u.resetCollision(),
                (u.faceTop = t),
                (u.faceBottom = t),
                (u.faceLeft = t),
                (u.faceRight = t));
            }
          return r && this.calculateFaces(n), n;
        },
        getLayer: function (e) {
          return (
            "undefined" == typeof e
              ? (e = this.currentLayer)
              : "string" == typeof e
              ? (e = this.getLayerIndex(e))
              : e instanceof t.TilemapLayer && (e = e.index),
            e
          );
        },
        calculateFaces: function (e) {
          for (
            var t = null,
              n = null,
              r = null,
              i = null,
              s = 0,
              o = this.layers[e].height;
            o > s;
            s++
          )
            for (var u = 0, a = this.layers[e].width; a > u; u++) {
              var f = this.layers[e].data[s][u];
              f &&
                ((t = this.getTileAbove(e, u, s)),
                (n = this.getTileBelow(e, u, s)),
                (r = this.getTileLeft(e, u, s)),
                (i = this.getTileRight(e, u, s)),
                f.collides &&
                  ((f.faceTop = !0),
                  (f.faceBottom = !0),
                  (f.faceLeft = !0),
                  (f.faceRight = !0)),
                t && t.collides && (f.faceTop = !1),
                n && n.collides && (f.faceBottom = !1),
                r && r.collides && (f.faceLeft = !1),
                i && i.collides && (f.faceRight = !1));
            }
        },
        getTileAbove: function (e, t, n) {
          return n > 0 ? this.layers[e].data[n - 1][t] : null;
        },
        getTileBelow: function (e, t, n) {
          return n < this.layers[e].height - 1
            ? this.layers[e].data[n + 1][t]
            : null;
        },
        getTileLeft: function (e, t, n) {
          return t > 0 ? this.layers[e].data[n][t - 1] : null;
        },
        getTileRight: function (e, t, n) {
          return t < this.layers[e].width - 1
            ? this.layers[e].data[n][t + 1]
            : null;
        },
        setLayer: function (e) {
          (e = this.getLayer(e)), this.layers[e] && (this.currentLayer = e);
        },
        hasTile: function (e, t, n) {
          return (
            null !== this.layers[n].data[t] &&
            null !== this.layers[n].data[t][e]
          );
        },
        putTile: function (e, n, r, i) {
          if (
            ((i = this.getLayer(i)),
            n >= 0 &&
              n < this.layers[i].width &&
              r >= 0 &&
              r < this.layers[i].height)
          ) {
            var s;
            return (
              e instanceof t.Tile
                ? ((s = e.index),
                  this.hasTile(n, r, i)
                    ? this.layers[i].data[r][n].copy(e)
                    : (this.layers[i].data[r][n] = new t.Tile(
                        i,
                        s,
                        n,
                        r,
                        e.width,
                        e.height
                      )))
                : ((s = e),
                  this.hasTile(n, r, i)
                    ? (this.layers[i].data[r][n].index = s)
                    : (this.layers[i].data[r][n] = new t.Tile(
                        this.layers[i],
                        s,
                        n,
                        r,
                        this.tileWidth,
                        this.tileHeight
                      ))),
              this.collideIndexes.indexOf(s) > -1
                ? this.layers[i].data[r][n].setCollision(!0, !0, !0, !0)
                : this.layers[i].data[r][n].resetCollision(),
              (this.layers[i].dirty = !0),
              this.calculateFaces(i),
              this.layers[i].data[r][n]
            );
          }
          return null;
        },
        putTileWorldXY: function (e, t, n, r, i, s) {
          (s = this.getLayer(s)),
            (t = this.game.math.snapToFloor(t, r) / r),
            (n = this.game.math.snapToFloor(n, i) / i),
            this.putTile(e, t, n, s);
        },
        getTile: function (e, t, n) {
          return (
            (n = this.getLayer(n)),
            e >= 0 &&
            e < this.layers[n].width &&
            t >= 0 &&
            t < this.layers[n].height
              ? this.layers[n].data[t][e]
              : void 0
          );
        },
        getTileWorldXY: function (e, t, n, r, i) {
          return (
            "undefined" == typeof n && (n = this.tileWidth),
            "undefined" == typeof r && (r = this.tileHeight),
            (i = this.getLayer(i)),
            (e = this.game.math.snapToFloor(e, n) / n),
            (t = this.game.math.snapToFloor(t, r) / r),
            this.getTile(e, t, i)
          );
        },
        copy: function (e, t, n, r, i) {
          if (((i = this.getLayer(i)), !this.layers[i]))
            return void (this._results.length = 0);
          "undefined" == typeof e && (e = 0),
            "undefined" == typeof t && (t = 0),
            "undefined" == typeof n && (n = this.layers[i].width),
            "undefined" == typeof r && (r = this.layers[i].height),
            0 > e && (e = 0),
            0 > t && (t = 0),
            n > this.layers[i].width && (n = this.layers[i].width),
            r > this.layers[i].height && (r = this.layers[i].height),
            (this._results.length = 0),
            this._results.push({ x: e, y: t, width: n, height: r, layer: i });
          for (var s = t; t + r > s; s++)
            for (var o = e; e + n > o; o++)
              this._results.push(this.layers[i].data[s][o]);
          return this._results;
        },
        paste: function (e, t, n, r) {
          if (
            ("undefined" == typeof e && (e = 0),
            "undefined" == typeof t && (t = 0),
            (r = this.getLayer(r)),
            n && !(n.length < 2))
          ) {
            for (var i = n[1].x - e, s = n[1].y - t, o = 1; o < n.length; o++)
              this.layers[r].data[s + n[o].y][i + n[o].x].copy(n[o]);
            (this.layers[r].dirty = !0), this.calculateFaces(r);
          }
        },
        swap: function (e, t, n, r, i, s, o) {
          (o = this.getLayer(o)),
            this.copy(n, r, i, s, o),
            this._results.length < 2 ||
              ((this._tempA = e),
              (this._tempB = t),
              this._results.forEach(this.swapHandler, this),
              this.paste(n, r, this._results, o));
        },
        swapHandler: function (e, t) {
          e.index === this._tempA && (this._results[t].index = this._tempB),
            e.index === this._tempB && (this._results[t].index = this._tempA);
        },
        forEach: function (e, t, n, r, i, s, o) {
          (o = this.getLayer(o)),
            this.copy(n, r, i, s, o),
            this._results.length < 2 ||
              (this._results.forEach(e, t), this.paste(n, r, this._results, o));
        },
        replace: function (e, t, n, r, i, s, o) {
          if (
            ((o = this.getLayer(o)),
            this.copy(n, r, i, s, o),
            !(this._results.length < 2))
          ) {
            for (var u = 1; u < this._results.length; u++)
              this._results[u].index === e && (this._results[u].index = t);
            this.paste(n, r, this._results, o);
          }
        },
        random: function (e, t, n, r, i) {
          if (
            ((i = this.getLayer(i)),
            this.copy(e, t, n, r, i),
            !(this._results.length < 2))
          ) {
            for (var s = [], o = 1; o < this._results.length; o++)
              if (this._results[o].index) {
                var u = this._results[o].index;
                -1 === s.indexOf(u) && s.push(u);
              }
            for (var a = 1; a < this._results.length; a++)
              this._results[a].index = this.game.rnd.pick(s);
            this.paste(e, t, this._results, i);
          }
        },
        shuffle: function (e, n, r, i, s) {
          if (
            ((s = this.getLayer(s)),
            this.copy(e, n, r, i, s),
            !(this._results.length < 2))
          ) {
            for (var o = [], u = 1; u < this._results.length; u++)
              this._results[u].index && o.push(this._results[u].index);
            t.Utils.shuffle(o);
            for (var a = 1; a < this._results.length; a++)
              this._results[a].index = o[a - 1];
            this.paste(e, n, this._results, s);
          }
        },
        fill: function (e, t, n, r, i, s) {
          if (
            ((s = this.getLayer(s)),
            this.copy(t, n, r, i, s),
            !(this._results.length < 2))
          ) {
            for (var o = 1; o < this._results.length; o++)
              this._results[o].index = e;
            this.paste(t, n, this._results, s);
          }
        },
        removeAllLayers: function () {
          (this.layers.length = 0), (this.currentLayer = 0);
        },
        dump: function () {
          for (
            var e = "", t = [""], n = 0;
            n < this.layers[this.currentLayer].height;
            n++
          ) {
            for (var r = 0; r < this.layers[this.currentLayer].width; r++)
              (e += "%c  "),
                t.push(
                  this.layers[this.currentLayer].data[n][r] > 1
                    ? this.debugMap[this.layers[this.currentLayer].data[n][r]]
                      ? "background: " +
                        this.debugMap[this.layers[this.currentLayer].data[n][r]]
                      : "background: #ffffff"
                    : "background: rgb(0, 0, 0)"
                );
            e += "\n";
          }
          (t[0] = e), console.log.apply(console, t);
        },
        destroy: function () {
          this.removeAllLayers(), (this.data = []), (this.game = null);
        },
      }),
      (t.Tilemap.prototype.constructor = t.Tilemap),
      (t.TilemapLayer = function (e, n, r, i, s) {
        (this.game = e),
          (this.map = n),
          (this.index = r),
          (this.layer = n.layers[r]),
          (this.canvas = t.Canvas.create(i, s, "", !0)),
          (this.context = this.canvas.getContext("2d")),
          (this.baseTexture = new PIXI.BaseTexture(this.canvas)),
          (this.texture = new PIXI.Texture(this.baseTexture)),
          (this.textureFrame = new t.Frame(
            0,
            0,
            0,
            i,
            s,
            "tilemapLayer",
            e.rnd.uuid()
          )),
          t.Image.call(this, this.game, 0, 0, this.texture, this.textureFrame),
          (this.name = ""),
          (this.type = t.TILEMAPLAYER),
          (this.fixedToCamera = !0),
          (this.cameraOffset = new t.Point(0, 0)),
          (this.tileColor = "rgb(255, 255, 255)"),
          (this.debug = !1),
          (this.debugAlpha = 0.5),
          (this.debugColor = "rgba(0, 255, 0, 1)"),
          (this.debugFill = !1),
          (this.debugFillColor = "rgba(0, 255, 0, 0.2)"),
          (this.debugCallbackColor = "rgba(255, 0, 0, 1)"),
          (this.scrollFactorX = 1),
          (this.scrollFactorY = 1),
          (this.dirty = !0),
          (this.rayStepRate = 4),
          (this._mc = {
            cw: n.tileWidth,
            ch: n.tileHeight,
            ga: 1,
            dx: 0,
            dy: 0,
            dw: 0,
            dh: 0,
            tx: 0,
            ty: 0,
            tw: 0,
            th: 0,
            tl: 0,
            maxX: 0,
            maxY: 0,
            startX: 0,
            startY: 0,
            x: 0,
            y: 0,
            prevX: 0,
            prevY: 0,
          }),
          (this._results = []),
          this.updateMax();
      }),
      (t.TilemapLayer.prototype = Object.create(t.Image.prototype)),
      (t.TilemapLayer.prototype.constructor = t.TilemapLayer),
      (t.TilemapLayer.prototype.postUpdate = function () {
        t.Image.prototype.postUpdate.call(this),
          (this.scrollX = this.game.camera.x * this.scrollFactorX),
          (this.scrollY = this.game.camera.y * this.scrollFactorY),
          this.render(),
          1 === this._cache[7] &&
            ((this.position.x =
              (this.game.camera.view.x + this.cameraOffset.x) /
              this.game.camera.scale.x),
            (this.position.y =
              (this.game.camera.view.y + this.cameraOffset.y) /
              this.game.camera.scale.y));
      }),
      (t.TilemapLayer.prototype.resizeWorld = function () {
        this.game.world.setBounds(
          0,
          0,
          this.layer.widthInPixels,
          this.layer.heightInPixels
        );
      }),
      (t.TilemapLayer.prototype._fixX = function (e) {
        return (
          0 > e && (e = 0),
          1 === this.scrollFactorX
            ? e
            : this._mc.x + (e - this._mc.x / this.scrollFactorX)
        );
      }),
      (t.TilemapLayer.prototype._unfixX = function (e) {
        return 1 === this.scrollFactorX
          ? e
          : this._mc.x / this.scrollFactorX + (e - this._mc.x);
      }),
      (t.TilemapLayer.prototype._fixY = function (e) {
        return (
          0 > e && (e = 0),
          1 === this.scrollFactorY
            ? e
            : this._mc.y + (e - this._mc.y / this.scrollFactorY)
        );
      }),
      (t.TilemapLayer.prototype._unfixY = function (e) {
        return 1 === this.scrollFactorY
          ? e
          : this._mc.y / this.scrollFactorY + (e - this._mc.y);
      }),
      (t.TilemapLayer.prototype.getTileX = function (e) {
        return (
          this.game.math.snapToFloor(this._fixX(e), this.map.tileWidth) /
          this.map.tileWidth
        );
      }),
      (t.TilemapLayer.prototype.getTileY = function (e) {
        return (
          this.game.math.snapToFloor(this._fixY(e), this.map.tileHeight) /
          this.map.tileHeight
        );
      }),
      (t.TilemapLayer.prototype.getTileXY = function (e, t, n) {
        return (n.x = this.getTileX(e)), (n.y = this.getTileY(t)), n;
      }),
      (t.TilemapLayer.prototype.getRayCastTiles = function (e, t, n, r) {
        ("undefined" == typeof t || null === t) && (t = this.rayStepRate),
          "undefined" == typeof n && (n = !1),
          "undefined" == typeof r && (r = !1);
        var i = this.getTiles(e.x, e.y, e.width, e.height, n, r);
        if (0 === i.length) return [];
        for (
          var s = e.coordinatesOnLine(t), o = s.length, u = [], a = 0;
          a < i.length;
          a++
        )
          for (var f = 0; o > f; f++)
            if (i[a].containsPoint(s[f][0], s[f][1])) {
              u.push(i[a]);
              break;
            }
        return u;
      }),
      (t.TilemapLayer.prototype.getTiles = function (e, t, n, r, i, s) {
        "undefined" == typeof i && (i = !1),
          "undefined" == typeof s && (s = !1),
          (e = this._fixX(e)),
          (t = this._fixY(t)),
          n > this.layer.widthInPixels && (n = this.layer.widthInPixels),
          r > this.layer.heightInPixels && (r = this.layer.heightInPixels),
          (this._mc.tx =
            this.game.math.snapToFloor(e, this._mc.cw) / this._mc.cw),
          (this._mc.ty =
            this.game.math.snapToFloor(t, this._mc.ch) / this._mc.ch),
          (this._mc.tw =
            (this.game.math.snapToCeil(n, this._mc.cw) + this._mc.cw) /
            this._mc.cw),
          (this._mc.th =
            (this.game.math.snapToCeil(r, this._mc.ch) + this._mc.ch) /
            this._mc.ch),
          (this._results.length = 0);
        for (var o = this._mc.ty; o < this._mc.ty + this._mc.th; o++)
          for (var u = this._mc.tx; u < this._mc.tx + this._mc.tw; u++)
            this.layer.data[o] &&
              this.layer.data[o][u] &&
              ((!i && !s) || this.layer.data[o][u].isInteresting(i, s)) &&
              this._results.push(this.layer.data[o][u]);
        return this._results;
      }),
      (t.TilemapLayer.prototype.updateMax = function () {
        (this._mc.maxX =
          this.game.math.ceil(this.canvas.width / this.map.tileWidth) + 1),
          (this._mc.maxY =
            this.game.math.ceil(this.canvas.height / this.map.tileHeight) + 1),
          this.layer &&
            (this._mc.maxX > this.layer.width &&
              (this._mc.maxX = this.layer.width),
            this._mc.maxY > this.layer.height &&
              (this._mc.maxY = this.layer.height)),
          (this.dirty = !0);
      }),
      (t.TilemapLayer.prototype.render = function () {
        if (
          (this.layer.dirty && (this.dirty = !0), this.dirty && this.visible)
        ) {
          (this._mc.prevX = this._mc.dx),
            (this._mc.prevY = this._mc.dy),
            (this._mc.dx = -(
              this._mc.x -
              this._mc.startX * this.map.tileWidth
            )),
            (this._mc.dy = -(
              this._mc.y -
              this._mc.startY * this.map.tileHeight
            )),
            (this._mc.tx = this._mc.dx),
            (this._mc.ty = this._mc.dy),
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height),
            (this.context.fillStyle = this.tileColor);
          var e, n;
          this.debug && (this.context.globalAlpha = this.debugAlpha);
          for (
            var r = this._mc.startY, i = this._mc.startY + this._mc.maxY;
            i > r;
            r++
          ) {
            this._column = this.layer.data[r];
            for (
              var s = this._mc.startX, o = this._mc.startX + this._mc.maxX;
              o > s;
              s++
            )
              this._column[s] &&
                ((e = this._column[s]),
                (n = this.map.tilesets[this.map.tiles[e.index][2]]),
                this.debug === !1 &&
                  e.alpha !== this.context.globalAlpha &&
                  (this.context.globalAlpha = e.alpha),
                n.draw(
                  this.context,
                  Math.floor(this._mc.tx),
                  Math.floor(this._mc.ty),
                  e.index
                ),
                e.debug &&
                  ((this.context.fillStyle = "rgba(0, 255, 0, 0.4)"),
                  this.context.fillRect(
                    Math.floor(this._mc.tx),
                    Math.floor(this._mc.ty),
                    this.map.tileWidth,
                    this.map.tileHeight
                  ))),
                (this._mc.tx += this.map.tileWidth);
            (this._mc.tx = this._mc.dx), (this._mc.ty += this.map.tileHeight);
          }
          return (
            this.debug && ((this.context.globalAlpha = 1), this.renderDebug()),
            this.game.renderType === t.WEBGL &&
              PIXI.updateWebGLTexture(this.baseTexture, this.game.renderer.gl),
            (this.dirty = !1),
            (this.layer.dirty = !1),
            !0
          );
        }
      }),
      (t.TilemapLayer.prototype.renderDebug = function () {
        (this._mc.tx = this._mc.dx),
          (this._mc.ty = this._mc.dy),
          (this.context.strokeStyle = this.debugColor),
          (this.context.fillStyle = this.debugFillColor);
        for (
          var e = this._mc.startY, t = this._mc.startY + this._mc.maxY;
          t > e;
          e++
        ) {
          this._column = this.layer.data[e];
          for (
            var n = this._mc.startX, r = this._mc.startX + this._mc.maxX;
            r > n;
            n++
          ) {
            var i = this._column[n];
            i &&
              (i.faceTop || i.faceBottom || i.faceLeft || i.faceRight) &&
              ((this._mc.tx = Math.floor(this._mc.tx)),
              this.debugFill &&
                this.context.fillRect(
                  this._mc.tx,
                  this._mc.ty,
                  this._mc.cw,
                  this._mc.ch
                ),
              this.context.beginPath(),
              i.faceTop &&
                (this.context.moveTo(this._mc.tx, this._mc.ty),
                this.context.lineTo(this._mc.tx + this._mc.cw, this._mc.ty)),
              i.faceBottom &&
                (this.context.moveTo(this._mc.tx, this._mc.ty + this._mc.ch),
                this.context.lineTo(
                  this._mc.tx + this._mc.cw,
                  this._mc.ty + this._mc.ch
                )),
              i.faceLeft &&
                (this.context.moveTo(this._mc.tx, this._mc.ty),
                this.context.lineTo(this._mc.tx, this._mc.ty + this._mc.ch)),
              i.faceRight &&
                (this.context.moveTo(this._mc.tx + this._mc.cw, this._mc.ty),
                this.context.lineTo(
                  this._mc.tx + this._mc.cw,
                  this._mc.ty + this._mc.ch
                )),
              this.context.stroke()),
              (this._mc.tx += this.map.tileWidth);
          }
          (this._mc.tx = this._mc.dx), (this._mc.ty += this.map.tileHeight);
        }
      }),
      Object.defineProperty(t.TilemapLayer.prototype, "scrollX", {
        get: function () {
          return this._mc.x;
        },
        set: function (e) {
          e !== this._mc.x &&
            e >= 0 &&
            this.layer.widthInPixels > this.width &&
            ((this._mc.x = e),
            this._mc.x > this.layer.widthInPixels - this.width &&
              (this._mc.x = this.layer.widthInPixels - this.width),
            (this._mc.startX = this.game.math.floor(
              this._mc.x / this.map.tileWidth
            )),
            this._mc.startX < 0 && (this._mc.startX = 0),
            this._mc.startX + this._mc.maxX > this.layer.width &&
              (this._mc.startX = this.layer.width - this._mc.maxX),
            (this.dirty = !0));
        },
      }),
      Object.defineProperty(t.TilemapLayer.prototype, "scrollY", {
        get: function () {
          return this._mc.y;
        },
        set: function (e) {
          e !== this._mc.y &&
            e >= 0 &&
            this.layer.heightInPixels > this.height &&
            ((this._mc.y = e),
            this._mc.y > this.layer.heightInPixels - this.height &&
              (this._mc.y = this.layer.heightInPixels - this.height),
            (this._mc.startY = this.game.math.floor(
              this._mc.y / this.map.tileHeight
            )),
            this._mc.startY < 0 && (this._mc.startY = 0),
            this._mc.startY + this._mc.maxY > this.layer.height &&
              (this._mc.startY = this.layer.height - this._mc.maxY),
            (this.dirty = !0));
        },
      }),
      Object.defineProperty(t.TilemapLayer.prototype, "collisionWidth", {
        get: function () {
          return this._mc.cw;
        },
        set: function (e) {
          (this._mc.cw = e), (this.dirty = !0);
        },
      }),
      Object.defineProperty(t.TilemapLayer.prototype, "collisionHeight", {
        get: function () {
          return this._mc.ch;
        },
        set: function (e) {
          (this._mc.ch = e), (this.dirty = !0);
        },
      }),
      (t.TilemapParser = {
        parse: function (e, n, r, i, s, o) {
          if (
            ("undefined" == typeof r && (r = 32),
            "undefined" == typeof i && (i = 32),
            "undefined" == typeof s && (s = 10),
            "undefined" == typeof o && (o = 10),
            "undefined" == typeof n)
          )
            return this.getEmptyData();
          if (null === n) return this.getEmptyData(r, i, s, o);
          var u = e.cache.getTilemapData(n);
          if (u) {
            if (u.format === t.Tilemap.CSV)
              return this.parseCSV(n, u.data, r, i);
            if (!u.format || u.format === t.Tilemap.TILED_JSON)
              return this.parseTiledJSON(u.data);
          } else
            console.warn(
              "Phaser.TilemapParser.parse - No map data found for key " + n
            );
        },
        parseCSV: function (e, n, r, i) {
          var s = this.getEmptyData();
          n = n.trim();
          for (
            var o = [], u = n.split("\n"), a = u.length, f = 0, l = 0;
            l < u.length;
            l++
          ) {
            o[l] = [];
            for (var c = u[l].split(","), h = 0; h < c.length; h++)
              o[l][h] = new t.Tile(0, parseInt(c[h], 10), h, l, r, i);
            0 === f && (f = c.length);
          }
          return (
            (s.name = e),
            (s.width = f),
            (s.height = a),
            (s.tileWidth = r),
            (s.tileHeight = i),
            (s.widthInPixels = f * r),
            (s.heightInPixels = a * i),
            (s.layers[0].width = f),
            (s.layers[0].height = a),
            (s.layers[0].widthInPixels = s.widthInPixels),
            (s.layers[0].heightInPixels = s.heightInPixels),
            (s.layers[0].data = o),
            s
          );
        },
        getEmptyData: function (e, t, n, r) {
          var i = {};
          (i.width = 0),
            (i.height = 0),
            (i.tileWidth = 0),
            (i.tileHeight = 0),
            "undefined" != typeof e && null !== e && (i.tileWidth = e),
            "undefined" != typeof t && null !== t && (i.tileHeight = t),
            "undefined" != typeof n && null !== n && (i.width = n),
            "undefined" != typeof r && null !== r && (i.height = r),
            (i.orientation = "orthogonal"),
            (i.version = "1"),
            (i.properties = {}),
            (i.widthInPixels = 0),
            (i.heightInPixels = 0);
          var s = [],
            o = {
              name: "layer",
              x: 0,
              y: 0,
              width: 0,
              height: 0,
              widthInPixels: 0,
              heightInPixels: 0,
              alpha: 1,
              visible: !0,
              properties: {},
              indexes: [],
              callbacks: [],
              data: [],
            };
          return (
            s.push(o),
            (i.layers = s),
            (i.images = []),
            (i.objects = {}),
            (i.collision = {}),
            (i.tilesets = []),
            (i.tiles = []),
            i
          );
        },
        parseTiledJSON: function (e) {
          if ("orthogonal" !== e.orientation)
            return (
              console.warn(
                "TilemapParser.parseTiledJSON: Only orthogonal map types are supported in this version of Phaser"
              ),
              null
            );
          var n = {};
          (n.width = e.width),
            (n.height = e.height),
            (n.tileWidth = e.tilewidth),
            (n.tileHeight = e.tileheight),
            (n.orientation = e.orientation),
            (n.version = e.version),
            (n.properties = e.properties),
            (n.widthInPixels = n.width * n.tileWidth),
            (n.heightInPixels = n.height * n.tileHeight);
          for (var r = [], i = 0; i < e.layers.length; i++)
            if ("tilelayer" === e.layers[i].type) {
              var s = {
                name: e.layers[i].name,
                x: e.layers[i].x,
                y: e.layers[i].y,
                width: e.layers[i].width,
                height: e.layers[i].height,
                widthInPixels: e.layers[i].width * e.tilewidth,
                heightInPixels: e.layers[i].height * e.tileheight,
                alpha: e.layers[i].opacity,
                visible: e.layers[i].visible,
                properties: {},
                indexes: [],
                callbacks: [],
                bodies: [],
              };
              e.layers[i].properties && (s.properties = e.layers[i].properties);
              for (
                var o = 0, u = [], a = [], f = 0, l = e.layers[i].data.length;
                l > f;
                f++
              )
                u.push(
                  e.layers[i].data[f] > 0
                    ? new t.Tile(
                        s,
                        e.layers[i].data[f],
                        o,
                        a.length,
                        e.tilewidth,
                        e.tileheight
                      )
                    : null
                ),
                  o++,
                  o === e.layers[i].width && (a.push(u), (o = 0), (u = []));
              (s.data = a), r.push(s);
            }
          n.layers = r;
          for (var c = [], i = 0; i < e.layers.length; i++)
            if ("imagelayer" === e.layers[i].type) {
              var h = {
                name: e.layers[i].name,
                image: e.layers[i].image,
                x: e.layers[i].x,
                y: e.layers[i].y,
                alpha: e.layers[i].opacity,
                visible: e.layers[i].visible,
                properties: {},
              };
              e.layers[i].properties && (h.properties = e.layers[i].properties),
                c.push(h);
            }
          n.images = c;
          for (var p = [], i = 0; i < e.tilesets.length; i++) {
            var d = e.tilesets[i],
              v = new t.Tileset(
                d.name,
                d.firstgid,
                d.tilewidth,
                d.tileheight,
                d.margin,
                d.spacing,
                d.properties
              );
            d.tileproperties && (v.tileProperties = d.tileproperties),
              (v.rows = Math.round(
                (d.imageheight - d.margin) / (d.tileheight + d.spacing)
              )),
              (v.columns = Math.round(
                (d.imagewidth - d.margin) / (d.tilewidth + d.spacing)
              )),
              (v.total = v.rows * v.columns),
              v.rows % 1 !== 0 || v.columns % 1 !== 0
                ? console.warn(
                    "TileSet image dimensions do not match expected dimensions. Tileset width/height must be evenly divisible by Tilemap tile width/height."
                  )
                : p.push(v);
          }
          n.tilesets = p;
          for (var m = {}, g = {}, i = 0; i < e.layers.length; i++)
            if ("objectgroup" === e.layers[i].type) {
              (m[e.layers[i].name] = []), (g[e.layers[i].name] = []);
              for (var y = 0, l = e.layers[i].objects.length; l > y; y++)
                if (e.layers[i].objects[y].gid) {
                  var w = {
                    gid: e.layers[i].objects[y].gid,
                    name: e.layers[i].objects[y].name,
                    x: e.layers[i].objects[y].x,
                    y: e.layers[i].objects[y].y,
                    visible: e.layers[i].objects[y].visible,
                    properties: e.layers[i].objects[y].properties,
                  };
                  m[e.layers[i].name].push(w);
                } else if (e.layers[i].objects[y].polyline) {
                  var w = {
                    name: e.layers[i].objects[y].name,
                    x: e.layers[i].objects[y].x,
                    y: e.layers[i].objects[y].y,
                    width: e.layers[i].objects[y].width,
                    height: e.layers[i].objects[y].height,
                    visible: e.layers[i].objects[y].visible,
                    properties: e.layers[i].objects[y].properties,
                  };
                  w.polyline = [];
                  for (
                    var E = 0;
                    E < e.layers[i].objects[y].polyline.length;
                    E++
                  )
                    w.polyline.push([
                      e.layers[i].objects[y].polyline[E].x,
                      e.layers[i].objects[y].polyline[E].y,
                    ]);
                  g[e.layers[i].name].push(w);
                }
            }
          (n.objects = m), (n.collision = g), (n.tiles = []);
          for (var i = 0; i < n.tilesets.length; i++)
            for (
              var d = n.tilesets[i],
                o = d.tileMargin,
                S = d.tileMargin,
                x = 0,
                T = 0,
                N = 0,
                f = d.firstgid;
              f < d.firstgid + d.total &&
              ((n.tiles[f] = [o, S, i]),
              (o += d.tileWidth + d.tileSpacing),
              x++,
              x !== d.total) &&
              (T++,
              T !== d.columns ||
                ((o = d.tileMargin),
                (S += d.tileHeight + d.tileSpacing),
                (T = 0),
                N++,
                N !== d.rows));
              f++
            );
          return n;
        },
      }),
      (t.Tileset = function (e, t, n, r, i, s, o) {
        ("undefined" == typeof n || 0 >= n) && (n = 32),
          ("undefined" == typeof r || 0 >= r) && (r = 32),
          "undefined" == typeof i && (i = 0),
          "undefined" == typeof s && (s = 0),
          (this.name = e),
          (this.firstgid = t),
          (this.tileWidth = n),
          (this.tileHeight = r),
          (this.tileMargin = i),
          (this.tileSpacing = s),
          (this.properties = o),
          (this.image = null),
          (this.rows = 0),
          (this.columns = 0),
          (this.total = 0),
          (this.drawCoords = []);
      }),
      (t.Tileset.prototype = {
        draw: function (e, t, n, r) {
          this.image &&
            this.drawCoords[r] &&
            e.drawImage(
              this.image,
              this.drawCoords[r][0],
              this.drawCoords[r][1],
              this.tileWidth,
              this.tileHeight,
              t,
              n,
              this.tileWidth,
              this.tileHeight
            );
        },
        setImage: function (e) {
          (this.image = e),
            (this.rows = Math.round(
              (e.height - this.tileMargin) /
                (this.tileHeight + this.tileSpacing)
            )),
            (this.columns = Math.round(
              (e.width - this.tileMargin) / (this.tileWidth + this.tileSpacing)
            )),
            (this.total = this.rows * this.columns),
            (this.drawCoords.length = 0);
          for (
            var t = this.tileMargin,
              n = this.tileMargin,
              r = this.firstgid,
              i = 0;
            i < this.rows;
            i++
          ) {
            for (var s = 0; s < this.columns; s++)
              (this.drawCoords[r] = [t, n]),
                (t += this.tileWidth + this.tileSpacing),
                r++;
            (t = this.tileMargin), (n += this.tileHeight + this.tileSpacing);
          }
        },
        setSpacing: function (e, t) {
          (this.tileMargin = e),
            (this.tileSpacing = t),
            this.setImage(this.image);
        },
      }),
      (t.Tileset.prototype.constructor = t.Tileset),
      "undefined" != typeof exports
        ? ("undefined" != typeof module &&
            module.exports &&
            (exports = module.exports = t),
          (exports.Phaser = t))
        : "undefined" != typeof define && define.amd
        ? define(
            "Phaser",
            (function () {
              return (e.Phaser = t);
            })()
          )
        : (e.Phaser = t);
  }.call(this),
  define("lib/phaser-no-physics.min", function () {}),
  require([
    "state/Load",
    "state/Start",
    "state/Play",
    "state/End",
    "lib/phaser-no-physics.min",
  ], function (e, t, n, r) {
    var i = new Phaser.Game(800, 600, Phaser.AUTO, "game");
    e.init(i, "Start"),
      i.state.add("Load", e.getLoadState()),
      t.init(i, "Play"),
      i.state.add("Start", t.getStartState()),
      n.init(i, "End"),
      i.state.add("Play", n.getPlayState()),
      r.init(i, "Play"),
      i.state.add("End", r.getEndState()),
      i.state.start("Load");
  }),
  define("main", function () {});
