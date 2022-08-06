import React, { useEffect, useRef, useState } from "react";
import wheel from "assets/Media/result.mp3";
import wheelPlay from "assets/Media/fortune-wheel-2.mp3";
// import './wheel.css'

const st = document.createElement("style");
st.textContent =
  '#wheelOfFortune{transform:scale(0.8);display:inline-block;position:relative;overflow:hidden;border-radius:50%;border:1px solid #d6d6d6;background:#fff}#wheel{display:block}#spin b{color:#5ea741}#spin{font:1em/0 sans-serif;user-select:none;cursor:pointer;display:flex;justify-content:center;align-items:center;position:absolute;top:50%;left:50%;width:15%;height:15%;margin:-7.5%;background:#fff;color:#5ea741;box-shadow:0 0 0 10px currentColor,0 0 0 0 #fff;border-radius:50%;transition:.8s}#spin::after{content:"";position:absolute;color:#fff;transform:rotate(90deg);right:-16px;border:12px solid transparent;border-bottom-color:currentColor;border-top:none}#spin::before{content:"";color:#5ea741;position:absolute;transform:rotate(90deg);right:-28px;border:13px solid transparent;border-bottom-color:currentColor;border-top:none}';
document.body.append(st);

const PI = Math.PI;
const TAD = 2 * PI;

const SpinWheel = ({ segments = [], height = "400", width = "400" }) => {
  const [play, setPlay] = useState();
  const params = window.location.href;
  let angVel = 0; // Angular velocity
  let arc = 0;
  const rand = (m, M) => Math.random() * (M - m) + m;
  // const [_winner, setWinner] = useState("");
  const winnerNew = useRef();

  const handleSpin = () => {
    // play?.audio2.play();
    angVel = rand(0.25, 0.35);
    localStorage.setItem("angVal", angVel);
    localStorage.setItem("spin", true);
    localStorage.removeItem("ang");
  };

  useEffect(() => {
    setPlay({
      audio1: new Audio(wheel),
      audio2: new Audio(wheelPlay),
    });
    handleSpin();
  }, []);

  if (params.includes("wheel1")) {
    segments = JSON.parse(localStorage.getItem("segments"));
    arc = TAD / segments.length;
  }

  useEffect(() => {
    initCanvas();
    rotate();
    engine();
  });

  if (params.includes("wheel1")) {
    setInterval(() => {
      handleSpin();
      if (localStorage.getItem("spin")) localStorage.setItem("spin", false);
    }, 1000);
  } else {
    localStorage.setItem("segments", JSON.stringify(segments));
    arc = TAD / segments.length;
  }

  let dia = 0;
  let rad = 0;
  let ctx = null;
  let ang = 0;

  const initCanvas = () => {
    var canvas = document.getElementById("wheel");
    ctx = canvas.getContext("2d");
    dia = ctx.canvas.width;
    rad = dia / 2;
    segments.forEach(wheelDraw);
  };

  function fittingString(ctx, str, maxWidth) {
    var width = ctx.measureText(str).width;
    var ellipsis = "…";
    var ellipsisWidth = ctx.measureText(ellipsis).width;
    if (width <= maxWidth || width <= ellipsisWidth) {
      return str;
    } else {
      var len = str.length;
      while (width >= maxWidth - ellipsisWidth && len-- > 0) {
        str = str.substring(0, len);
        width = ctx.measureText(str).width;
      }
      return str + ellipsis;
    }
  }

  const wheelDraw = function wheelDraw(v, i) {
    ang = arc * i;
    // COLOR
    ctx.beginPath();
    ctx.fillStyle = v.color;
    ctx.moveTo(rad, rad);
    ctx.arc(rad, rad, rad - 10, ang, ang + arc);
    ctx.lineTo(rad, rad);
    ctx.fill();
    ctx.save();

    // TEXT
    ctx.translate(rad, rad);
    ctx.rotate(ang + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "bold 20px sans-serif";
    ctx.globalCompositeOperation = "difference";
    ctx.fillText(fittingString(ctx, v.label, 150), rad - 40, 10);
    ctx.restore();
  };

  const rotate = () => {
    let SegmentIndex =
      Math.floor(segments.length - (ang / TAD) * segments.length) %
      segments.length;

    ctx.canvas.style.transform = `rotate(${ang}rad)`;

    localStorage.removeItem("winner");
    if (angVel === 0) {
      let a = SegmentIndex;
      if (params.includes("wheel1")) {
        a = localStorage.getItem("winner");
      } else {
        segments.map((v, i) => {
          if (i === SegmentIndex) {
            a = v.label;
            return v.label;
          }
          return null;
        });

        localStorage.setItem("winner", a);
        if (winnerNew.current !== null) {
          winnerNew.current.innerHTML = a;
        }
      }
    }
  };

  const frame = () => {
    if (!angVel) return;

    angVel *= rand(0.985, 0.998); // Decrement velocity

    if (angVel < 0.002) {
      angVel = 0;
      play?.audio1.play();
    } // Bring to stop
    ang += angVel; // Update angle
    ang %= TAD; // Normalize angle
    if (!params.includes("wheel1")) {
      ang %= TAD; // Normalize angle
      localStorage.setItem("ang", ang);
    } else {
      ang = localStorage.getItem("ang");
    }

    rotate();
  };

  const engine = () => {
    frame();
    requestAnimationFrame(engine);
  };

  return (
    <>
      <div className="text-center">
        <h1 className="mt-3" ref={winnerNew}>
          {localStorage.getItem("winner")}
        </h1>
      </div>
      <div className="text-center">
        <div id="wheelOfFortune">
          <canvas id="wheel" width={width} height={height}></canvas>
          <div id="spin" onClick={handleSpin}>
            <b>SPIN</b>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpinWheel;
