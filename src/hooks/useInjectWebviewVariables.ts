import { useCallback } from 'react';
import type { Theme, ePubCfi } from '../types';
import template from '../template';
import type { SourceType } from '../utils/enums/source-type.enum';

export function useInjectWebVieWVariables() {
  const injectWebVieWVariables = useCallback(
    ({
      jzipJs,
      epubJs,
      type,
      book,
      theme,
      enableSelection,
      locations,
    }: {
      jzipJs: string;
      epubJs: string;
      type: SourceType;
      book: string;
      theme: Theme;
      enableSelection: boolean;
      locations?: ePubCfi[];
    }) => {
      return template
        .replace(
          /<script id="jzip"><\/script>/,
          `<script src="${jzipJs}"></script>`
        )
        .replace(
          /<script id="epubjs"><\/script>/,
          `<script src="${epubJs}"></script>`
        )
        .replace(/const type = window.type;/, `const type = '${type}';`)
        .replace(/const file = window.book;/, `const file = '${book}';`)
        .replace(
          /const theme = window.theme;/,
          `const theme = ${JSON.stringify(theme)};`
        )
        .replace(
          /const initialLocations = window.locations;/,
          `const initialLocations = ${locations};`
        )
        .replace(
          /const enableSelection = window.enable_selection;/,
          `const enableSelection = ${enableSelection};`
        );
    },
    []
  );
  return { injectWebVieWVariables };
}
