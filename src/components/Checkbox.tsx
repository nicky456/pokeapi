import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import colors from "../vars/colors";

interface CheckboxProps {
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, setChecked }) => {
  return (
    <CheckboxComponent>
      <CheckboxWrapper onClick={() => setChecked(!checked)}>
        <LabelIcon>
          {!checked && (
            <LabelIconUncheckedWrapper>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <OuterRect
                  x="0.5"
                  y="0.52"
                  width="19"
                  height="19"
                  rx="1.5"
                  strokeWidth="1"
                  stroke={colors.black}
                ></OuterRect>
              </svg>
            </LabelIconUncheckedWrapper>
          )}
          {checked && (
            <LabelIconCheckedWrapper>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <OuterRect
                  x="0.5"
                  y="0.52"
                  width="19"
                  height="19"
                  rx="1.5"
                  strokeWidth="0"
                  stroke={colors.black}
                  fill={colors.black}
                ></OuterRect>
                <InnerRect
                  fillRule="evenodd"
                  clipRule="evenodd"
                  fill={colors.white}
                  d="M13.4,6.2l-5.1,5.2L6.6,9.5C6.5,9.4,6.4,9.3,6.2,9.3S6,9.4,5.9,9.5
	l-0.7,0.7c-0.2,0.2-0.2,0.5,0,0.7L8,13.8C8.1,13.9,8.2,14,8.4,14c0.1,0,0.3-0.1,0.4-0.2l6.1-6.3c0.2-0.2,0.2-0.5,0-0.7l-0.7-0.7
	C14,6.1,13.9,6,13.8,6C13.6,6,13.5,6.1,13.4,6.2z"
                ></InnerRect>
              </svg>
            </LabelIconCheckedWrapper>
          )}
        </LabelIcon>
        <Text>Check to see your catched Pokemons</Text>
      </CheckboxWrapper>
    </CheckboxComponent>
  );
};

export default Checkbox;

const CheckboxComponent = styled.div`
  padding-left: 0;
  width: fit-content;
  height: 40px;
`;
const CheckboxWrapper = styled.div`
  position: relative;
  display: flex;
  cursor: pointer;
  gap: 5px;
`;
const LabelIcon = styled.div`
  * {
    pointer-events: none;
  }
`;
const LabelIconUncheckedWrapper = styled.div``;
const LabelIconCheckedWrapper = styled.div``;
const OuterRect = styled.rect``;
const InnerRect = styled.path``;
const Text = styled.div``;
