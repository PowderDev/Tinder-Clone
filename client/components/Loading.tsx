import React from "react";

const Loading: React.FC<{ width: number; height: number }> = ({ width, height }) => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{
          margin: "auto",
          display: "block",
          shapeRendering: "auto",
        }}
        width={width + "px"}
        height={height + "px"}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <rect x="12.5" y="12.5" width="18" height="18" fill="#542175">
          <animate
            attributeName="fill"
            values="#dc93f8;#542175;#542175"
            keyTimes="0;0.08333333333333333;1"
            dur="1.0526315789473684s"
            repeatCount="indefinite"
            begin="0s"
            calcMode="discrete"
          ></animate>
        </rect>
        <rect x="31.5" y="12.5" width="18" height="18" fill="#542175">
          <animate
            attributeName="fill"
            values="#dc93f8;#542175;#542175"
            keyTimes="0;0.08333333333333333;1"
            dur="1.0526315789473684s"
            repeatCount="indefinite"
            begin="0.08771929824561403s"
            calcMode="discrete"
          ></animate>
        </rect>
        <rect x="50.5" y="12.5" width="18" height="18" fill="#542175">
          <animate
            attributeName="fill"
            values="#dc93f8;#542175;#542175"
            keyTimes="0;0.08333333333333333;1"
            dur="1.0526315789473684s"
            repeatCount="indefinite"
            begin="0.17543859649122806s"
            calcMode="discrete"
          ></animate>
        </rect>
        <rect x="69.5" y="12.5" width="18" height="18" fill="#542175">
          <animate
            attributeName="fill"
            values="#dc93f8;#542175;#542175"
            keyTimes="0;0.08333333333333333;1"
            dur="1.0526315789473684s"
            repeatCount="indefinite"
            begin="0.2631578947368421s"
            calcMode="discrete"
          ></animate>
        </rect>
        <rect x="12.5" y="31.5" width="18" height="18" fill="#542175">
          <animate
            attributeName="fill"
            values="#dc93f8;#542175;#542175"
            keyTimes="0;0.08333333333333333;1"
            dur="1.0526315789473684s"
            repeatCount="indefinite"
            begin="0.9649122807017544s"
            calcMode="discrete"
          ></animate>
        </rect>
        <rect x="69.5" y="31.5" width="18" height="18" fill="#542175">
          <animate
            attributeName="fill"
            values="#dc93f8;#542175;#542175"
            keyTimes="0;0.08333333333333333;1"
            dur="1.0526315789473684s"
            repeatCount="indefinite"
            begin="0.3508771929824561s"
            calcMode="discrete"
          ></animate>
        </rect>
        <rect x="12.5" y="50.5" width="18" height="18" fill="#542175">
          <animate
            attributeName="fill"
            values="#dc93f8;#542175;#542175"
            keyTimes="0;0.08333333333333333;1"
            dur="1.0526315789473684s"
            repeatCount="indefinite"
            begin="0.8771929824561403s"
            calcMode="discrete"
          ></animate>
        </rect>
        <rect x="69.5" y="50.5" width="18" height="18" fill="#542175">
          <animate
            attributeName="fill"
            values="#dc93f8;#542175;#542175"
            keyTimes="0;0.08333333333333333;1"
            dur="1.0526315789473684s"
            repeatCount="indefinite"
            begin="0.43859649122807015s"
            calcMode="discrete"
          ></animate>
        </rect>
        <rect x="12.5" y="69.5" width="18" height="18" fill="#542175">
          <animate
            attributeName="fill"
            values="#dc93f8;#542175;#542175"
            keyTimes="0;0.08333333333333333;1"
            dur="1.0526315789473684s"
            repeatCount="indefinite"
            begin="0.7894736842105263s"
            calcMode="discrete"
          ></animate>
        </rect>
        <rect x="31.5" y="69.5" width="18" height="18" fill="#542175">
          <animate
            attributeName="fill"
            values="#dc93f8;#542175;#542175"
            keyTimes="0;0.08333333333333333;1"
            dur="1.0526315789473684s"
            repeatCount="indefinite"
            begin="0.7017543859649122s"
            calcMode="discrete"
          ></animate>
        </rect>
        <rect x="50.5" y="69.5" width="18" height="18" fill="#542175">
          <animate
            attributeName="fill"
            values="#dc93f8;#542175;#542175"
            keyTimes="0;0.08333333333333333;1"
            dur="1.0526315789473684s"
            repeatCount="indefinite"
            begin="0.6140350877192983s"
            calcMode="discrete"
          ></animate>
        </rect>
        <rect x="69.5" y="69.5" width="18" height="18" fill="#542175">
          <animate
            attributeName="fill"
            values="#dc93f8;#542175;#542175"
            keyTimes="0;0.08333333333333333;1"
            dur="1.0526315789473684s"
            repeatCount="indefinite"
            begin="0.5263157894736842s"
            calcMode="discrete"
          ></animate>
        </rect>
      </svg>
    </div>
  );
};

export default Loading;
