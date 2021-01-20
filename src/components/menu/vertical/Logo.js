import React from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";

const ThemedBrand = ({ theme, layout }) => {
  return layout === "basic" || layout === "classy" || layout === "classic" ? (
    <span className={`${theme ? "text-white" : "text-gray-900"}`}>NUCLEO</span>
  ) : (
    ""
  );
};

const Logo = ({ color, theme, layout }) => {
  return (
    <NavLink to="/" className="flex items-center">
      <span
        className={classNames({
          "mr-3 w-8": layout !== "compact",
          "py-8 w-12": layout === "compact",
        })}
      >
        <svg
          enableBackground="new 0 0 511.848 511.848"
          viewBox="0 0 511.848 511.848"
          xmlns="http://www.w3.org/2000/svg"
          fill={color}
        >
          <g>
            <ellipse
              cx="270.214"
              cy="241.634"
              rx="126.731"
              ry="126.731"
              transform="matrix(.924 -.383 .383 .924 -71.9 121.8)"
            />
            <path d="m426.01 120.618c24.03 0 43.58-19.55 43.58-43.581s-19.55-43.581-43.58-43.581-43.581 19.55-43.581 43.581 19.55 43.581 43.581 43.581z" />
            <path d="m142.553 72.834c36.981-28.022 81.126-42.834 127.661-42.834 33.66 0 65.841 7.672 95.648 22.803l13.58-26.751c-34.055-17.287-70.805-26.052-109.228-26.052-53.131 0-103.54 16.917-145.779 48.923-40.855 30.958-71.352 74.933-85.871 123.826l28.76 8.54c12.712-42.812 39.429-81.328 75.229-108.455z" />
            <path d="m479.464 120.738-25.963 15.031c18.545 32.032 28.347 68.639 28.347 105.865 0 46.535-14.812 90.68-42.834 127.662-27.127 35.8-65.644 62.517-108.455 75.23l8.539 28.759c48.894-14.519 92.869-45.015 123.827-85.871 32.006-42.239 48.923-92.649 48.923-145.78 0-42.497-11.199-84.302-32.384-120.896z" />
            <path d="m67.323 301.978-28.759 8.54c11.374 38.304 32.398 73.563 60.801 101.965 28.402 28.402 63.661 49.427 101.965 60.801l8.54-28.759c-33.532-9.958-64.409-28.373-89.292-53.256-24.882-24.883-43.298-55.759-53.255-89.291z" />
            <path d="m270.214 424.686c-24.03 0-43.58 19.55-43.58 43.581 0 24.03 19.55 43.581 43.58 43.581s43.581-19.55 43.581-43.581-19.551-43.581-43.581-43.581z" />
            <circle cx="43.581" cy="241.634" r="43.581" />
          </g>
        </svg>
      </span>
      <ThemedBrand layout={layout} theme={theme} />
    </NavLink>
  );
};

export default Logo;
