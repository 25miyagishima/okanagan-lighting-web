import {
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

import { pdfTheme } from "@/features/pdf/pdf-theme";

export const pdfStyles = StyleSheet.create({
  page: {
    paddingTop: pdfTheme.spacing.pageTop,
    paddingBottom: pdfTheme.spacing.pageBottom,
    paddingHorizontal: pdfTheme.spacing.pageX,
    backgroundColor: pdfTheme.colors.paper,
    color: pdfTheme.colors.ink,
    fontFamily: pdfTheme.typography.fontFamily,
    fontSize: pdfTheme.typography.body,
    lineHeight: pdfTheme.typography.lineHeight.normal,
  },

  coverPage: {
    paddingTop: 72,
    paddingBottom: 72,
    paddingHorizontal: 56,
    backgroundColor: pdfTheme.colors.paper,
    color: pdfTheme.colors.ink,
    fontFamily: pdfTheme.typography.fontFamily,
  },

  section: {
    marginBottom: pdfTheme.spacing.xl,
  },

  sectionHeader: {
    marginBottom: pdfTheme.spacing.md,
  },

  sectionTitle: {
    fontSize: pdfTheme.typography.sectionTitle,
    color: pdfTheme.colors.ink,
    fontWeight: 700,
    marginBottom: 2,
  },

  sectionSubtitle: {
    fontSize: pdfTheme.typography.small,
    color: pdfTheme.colors.softInk,
  },

  card: {
    borderWidth: pdfTheme.stroke.thin,
    borderColor: pdfTheme.colors.border,
    borderRadius: pdfTheme.radius.md,
    padding: pdfTheme.spacing.md,
    backgroundColor: pdfTheme.colors.paper,
  },

  mutedCard: {
    borderWidth: pdfTheme.stroke.thin,
    borderColor: pdfTheme.colors.softBorder,
    borderRadius: pdfTheme.radius.md,
    padding: pdfTheme.spacing.md,
    backgroundColor: pdfTheme.colors.warmPaper,
  },

  divider: {
    height: 1,
    backgroundColor: pdfTheme.colors.softBorder,
    marginVertical: pdfTheme.spacing.lg,
  },

  pageTitle: {
    fontSize: pdfTheme.typography.pageTitle,
    fontWeight: 700,
    color: pdfTheme.colors.ink,
  },

  coverTitle: {
    fontSize: pdfTheme.typography.coverTitle,
    fontWeight: 700,
    color: pdfTheme.colors.ink,
    lineHeight: 1.1,
  },

  bodyText: {
    fontSize: pdfTheme.typography.body,
    color: pdfTheme.colors.mutedInk,
    lineHeight: pdfTheme.typography.lineHeight.relaxed,
  },

  smallText: {
    fontSize: pdfTheme.typography.small,
    color: pdfTheme.colors.softInk,
  },

  keyValueRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 6,
  },

  keyLabel: {
    fontSize: pdfTheme.typography.body,
    color: pdfTheme.colors.mutedInk,
  },

  keyValue: {
    fontSize: pdfTheme.typography.body,
    color: pdfTheme.colors.ink,
    fontWeight: 600,
  },

  footer: {
    position: "absolute",
    bottom: 24,
    left: pdfTheme.spacing.pageX,
    right: pdfTheme.spacing.pageX,
    borderTopWidth: pdfTheme.stroke.thin,
    borderTopColor: pdfTheme.colors.softBorder,
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  footerText: {
    fontSize: pdfTheme.typography.micro,
    color: pdfTheme.colors.softInk,
  },

  goldText: {
    color: pdfTheme.colors.gold,
  },

  centered: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export function PdfPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Page size="LETTER" style={pdfStyles.page}>
      {children}

      <View fixed style={pdfStyles.footer}>
        <Text style={pdfStyles.footerText}>
          {pdfTheme.footer.text}
        </Text>

        <Text
          style={pdfStyles.footerText}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
        />
      </View>
    </Page>
  );
}

export function PdfSection({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <View style={pdfStyles.section}>
      <View style={pdfStyles.sectionHeader}>
        <Text style={pdfStyles.sectionTitle}>{title}</Text>

        {subtitle ? (
          <Text style={pdfStyles.sectionSubtitle}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      {children}
    </View>
  );
}

export function PdfCard({
  children,
  muted = false,
}: {
  children: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <View
      style={muted ? pdfStyles.mutedCard : pdfStyles.card}
    >
      {children}
    </View>
  );
}

export function PdfDivider() {
  return <View style={pdfStyles.divider} />;
}

export function PdfKeyValueRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={pdfStyles.keyValueRow}>
      <Text style={pdfStyles.keyLabel}>{label}</Text>

      <Text style={pdfStyles.keyValue}>{value}</Text>
    </View>
  );
}