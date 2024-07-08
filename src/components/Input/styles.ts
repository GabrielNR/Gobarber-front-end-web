import styled, { css } from "styled-components";
import { Tooltip } from '../Tooltip';

interface Containerprops {
  $isFocused: boolean,
	$isField: boolean,
  $isErroded: boolean
}

export const Container = styled.div<Containerprops>`
    background: #232129;
    border-radius: 10px;
    width: 100%;
    padding: 16px;

    border: 2px solid #232129;
    color: #666360;
    
    display: flex;
    align-items: center;

    & + div {
      margin-top: 8px;
    }
    ${props => props.$isErroded && css`
      border-color: #c53030;
    `}

    ${(props: { $isFocused: any; }) => props.$isFocused && css`
      color: #ff9000;
      border-color: #ff9000;
    `}

    ${(props: { $isField: any; }) => props.$isField && css`
        color: #ff9000;
    `}

    input {
      flex: 1;
      background: transparent;
      border: 0;
      color: #f4ede8;

      &::placeholder {
        color: #666360
      }
    }
    
    svg {
      margin-right: 16px;
    }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

      &::before {
      content: '';
      border-color: #c53030 transparent;
    }
  }
`