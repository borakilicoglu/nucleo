import React, { useContext } from "react";
import { ContextLayout } from "../../../../utility/context/Layout";
import classNames from "classnames";
import CompactIcon from "./CompactIcon";

export default function Menu({ menuConfig }) {
  const contextLayout = useContext(ContextLayout);
  const { activeLayout } = contextLayout.state;

  return (
    <div>
      {menuConfig.map((value, index) => (
        <div
          className={`${
            index === 0 && activeLayout === "basic" ? "pt-8 pb-4" : "py-4"
          }`}
          className={classNames({
            "pt-8 pb-4": index === 0 && activeLayout === "basic",
            "py-4": activeLayout === "classic && classy",
          })}
          key={index}
        >
          <button className="font-semibold text-center font-xs lowercase py-6 w-full">
            <CompactIcon>{value?.icon && value.icon}</CompactIcon>
            <p
              style={{ textTransform: "capitalize" }}
              className="mt-3 text-gray-300"
            >
              {value.name.charAt(0).toUpperCase() + value.name.slice(1)}
            </p>
          </button>
        </div>
      ))}
    </div>
  );
}
