export const pdfTheme = {
  colors: {
    ink: "#171717",
    mutedInk: "#5F6368",
    softInk: "#8A8F98",

    paper: "#FFFFFF",
    warmPaper: "#F7F3ED",
    panel: "#F4F0EA",
    panelDark: "#222222",

    gold: "#D88B2D",
    softGold: "#E2B15A",
    goldWash: "#F7E6CF",

    border: "#DED6CA",
    softBorder: "#ECE5DA",

    success: "#2F855A",
    warning: "#B7791F",
    danger: "#C53030",
  },

  typography: {
    fontFamily: "Helvetica",

    coverTitle: 30,
    pageTitle: 22,
    sectionTitle: 15,
    cardTitle: 12,
    body: 10,
    small: 8,
    micro: 7,

    lineHeight: {
      tight: 1.15,
      normal: 1.35,
      relaxed: 1.55,
    },
  },

  spacing: {
    pageX: 42,
    pageTop: 42,
    pageBottom: 42,

    xs: 4,
    sm: 8,
    md: 12,
    lg: 18,
    xl: 28,
    xxl: 42,
  },

  radius: {
    sm: 4,
    md: 8,
    lg: 14,
  },

  stroke: {
    thin: 0.5,
    normal: 1,
    heavy: 1.5,
  },

  table: {
    headerFill: "#222222",
    headerText: "#FFFFFF",
    rowFill: "#FFFFFF",
    alternateRowFill: "#F7F3ED",
    border: "#DED6CA",
  },

  footer: {
    height: 28,
    text: "Okanagan Lighting Systems",
  },
} as const;

export type PdfTheme = typeof pdfTheme;