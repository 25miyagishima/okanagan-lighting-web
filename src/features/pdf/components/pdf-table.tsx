import {
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

import { pdfTheme } from "@/features/pdf/pdf-theme";

type PdfTableColumn = {
  key: string;
  label: string;
  width?: string | number;
  align?: "left" | "center" | "right";
};

type PdfTableRow = Record<string, string | number | null | undefined>;

type PdfTableProps = {
  columns: PdfTableColumn[];
  rows: PdfTableRow[];
  emptyText?: string;
};

const styles = StyleSheet.create({
  table: {
    borderWidth: pdfTheme.stroke.thin,
    borderColor: pdfTheme.table.border,
    borderRadius: pdfTheme.radius.md,
    overflow: "hidden",
  },

  row: {
    flexDirection: "row",
  },

  headerRow: {
    backgroundColor: pdfTheme.table.headerFill,
  },

  bodyRow: {
    backgroundColor: pdfTheme.table.rowFill,
    borderTopWidth: pdfTheme.stroke.thin,
    borderTopColor: pdfTheme.table.border,
  },

  alternateBodyRow: {
    backgroundColor: pdfTheme.table.alternateRowFill,
    borderTopWidth: pdfTheme.stroke.thin,
    borderTopColor: pdfTheme.table.border,
  },

  cell: {
    paddingVertical: 7,
    paddingHorizontal: 8,
    fontSize: pdfTheme.typography.small,
  },

  headerCellText: {
    color: pdfTheme.table.headerText,
    fontSize: pdfTheme.typography.small,
    fontWeight: 700,
  },

  bodyCellText: {
    color: pdfTheme.colors.ink,
    fontSize: pdfTheme.typography.small,
  },

  mutedText: {
    color: pdfTheme.colors.softInk,
    fontSize: pdfTheme.typography.small,
  },

  totalRow: {
    flexDirection: "row",
    backgroundColor: pdfTheme.colors.goldWash,
    borderTopWidth: pdfTheme.stroke.normal,
    borderTopColor: pdfTheme.colors.gold,
  },

  totalText: {
    color: pdfTheme.colors.ink,
    fontSize: pdfTheme.typography.body,
    fontWeight: 700,
  },
});

function getAlignment(
  align: PdfTableColumn["align"],
): "flex-start" | "center" | "flex-end" {
  if (align === "center") return "center";
  if (align === "right") return "flex-end";
  return "flex-start";
}

function formatCellValue(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  return String(value);
}

export function PdfTable({
  columns,
  rows,
  emptyText = "No data available.",
}: PdfTableProps) {
  if (rows.length === 0) {
    return (
      <View style={styles.table}>
        <View style={[styles.row, styles.bodyRow]}>
          <View style={styles.cell}>
            <Text style={styles.mutedText}>{emptyText}</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.table}>
      <View style={[styles.row, styles.headerRow]}>
        {columns.map((column) => (
          <View
            key={column.key}
            style={[
              styles.cell,
              {
                width: column.width ?? `${100 / columns.length}%`,
                alignItems: getAlignment(column.align),
              },
            ]}
          >
            <Text style={styles.headerCellText}>
              {column.label}
            </Text>
          </View>
        ))}
      </View>

      {rows.map((row, rowIndex) => (
        <View
          key={rowIndex}
          style={[
            styles.row,
            rowIndex % 2 === 0
              ? styles.bodyRow
              : styles.alternateBodyRow,
          ]}
          wrap={false}
        >
          {columns.map((column) => (
            <View
              key={column.key}
              style={[
                styles.cell,
                {
                  width: column.width ?? `${100 / columns.length}%`,
                  alignItems: getAlignment(column.align),
                },
              ]}
            >
              <Text style={styles.bodyCellText}>
                {formatCellValue(row[column.key])}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

export function PdfTotalRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.totalRow} wrap={false}>
      <View style={[styles.cell, { width: "70%" }]}>
        <Text style={styles.totalText}>{label}</Text>
      </View>

      <View
        style={[
          styles.cell,
          {
            width: "30%",
            alignItems: "flex-end",
          },
        ]}
      >
        <Text style={styles.totalText}>{value}</Text>
      </View>
    </View>
  );
}