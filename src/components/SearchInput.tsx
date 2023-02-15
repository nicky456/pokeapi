import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import colors from "../vars/colors";

interface SearchProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

const SearchInput: React.FC<SearchProps> = ({ query, setQuery }) => {
  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const serchTerm = event.target.value;
    setQuery(serchTerm);
  };

  const resetSearch = () => {
    setQuery("");
  };

  return (
    <InputTextComponent>
      <InputWrapper>
        <Input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={inputHandler}
        ></Input>

        <Icon className="fa fa-times fa-3x" onClick={resetSearch}></Icon>
      </InputWrapper>
      <Subtext>At least 3 characters</Subtext>
    </InputTextComponent>
  );
};

export default SearchInput;

const InputTextComponent = styled.div`
  width: 220px;
  padding-left: 0;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  height: 30px;
  background-color: ${colors.white};
  border: 1px solid ${colors.black};
  border-radius: 10px;
  width: 100%;
  font-weight: 600;
  font-size: 16px;
  color: ${colors.black};
  padding-left: 10px;
  text-transform: uppercase;

  &:focus-visible,
  &:focus {
    outline: none;
    border: 1px solid ${colors.black};
  }
  &:focus {
    border: 1px solid ${colors.black};
  }
  &::placeholder {
    color: ${colors.black};
    text-transform: capitalize;
  }
`;

const Icon = styled.div`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  font-weight: 700;
  font-size: 16px;
  color: ${colors.black};
`;

const Subtext = styled.div`
  font-weight: 300;
  font-size: 12px;
  color: ${colors.black};
  margin: 5px 0 0 5px;
  line-height: 1.3;
`;
