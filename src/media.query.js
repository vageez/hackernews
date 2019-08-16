import { css } from 'styled-components'

export const media = {
  MOBILE: (...args) => css`
    @media (max-width: 640px) {
      ${css(...args)};
    }
  `,
}
