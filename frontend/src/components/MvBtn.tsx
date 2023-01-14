
import React, { useId } from "react";

interface MvBtnProps {
    tooltip_text: string;
    text: string;
    click: () => void;
}

const MvBtn = (
    { tooltip_text, text, click }: MvBtnProps
) => {
  return (
    <div className="mv-btn group">
      <button
        type="button"
        title={tooltip_text}
        onClick={click}
        className="p-0 font-bold"
      >
        {text}
      </button>
    </div>
  );
};

export default MvBtn;