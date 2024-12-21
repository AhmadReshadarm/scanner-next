import styled from "styled-components";

type StyleProps = {
  rotate?: string;
};

const ArrowSpan = styled.span`
  width: 20px;
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transform: rotate(${(p: StyleProps) => p.rotate}deg);
`;

export { ArrowSpan };
