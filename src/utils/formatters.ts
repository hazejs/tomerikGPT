/**
 * Utility functions for formatting messages
 */

/**
 * Formats code blocks in a message
 * @param language The programming language for syntax highlighting
 * @param code The code to format
 * @returns Formatted code block with markdown syntax
 */
export function formatCodeBlock(language: string, code: string): string {
  return `\`\`\`${language}\n${code}\n\`\`\``;
}

/**
 * Formats inline code in a message
 * @param code The code to format
 * @returns Formatted inline code with markdown syntax
 */
export function formatInlineCode(code: string): string {
  return `\`${code}\``;
}

/**
 * Formats an unordered list in a message
 * @param items Array of list items
 * @returns Formatted unordered list with markdown syntax
 */
export function formatUnorderedList(items: string[]): string {
  return items.map((item) => `- ${item}`).join("\n");
}

/**
 * Formats an ordered list in a message
 * @param items Array of list items
 * @returns Formatted ordered list with markdown syntax
 */
export function formatOrderedList(items: string[]): string {
  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

/**
 * Formats a heading in a message
 * @param level Heading level (1-6)
 * @param text Heading text
 * @returns Formatted heading with markdown syntax
 */
export function formatHeading(level: number, text: string): string {
  const headingLevel = Math.min(Math.max(level, 1), 6);
  const hashes = "#".repeat(headingLevel);
  return `${hashes} ${text}`;
}

/**
 * Formats bold text in a message
 * @param text Text to make bold
 * @returns Formatted bold text with markdown syntax
 */
export function formatBold(text: string): string {
  return `**${text}**`;
}

/**
 * Formats italic text in a message
 * @param text Text to make italic
 * @returns Formatted italic text with markdown syntax
 */
export function formatItalic(text: string): string {
  return `*${text}*`;
}

/**
 * Formats a blockquote in a message
 * @param text Text to format as blockquote
 * @returns Formatted blockquote with markdown syntax
 */
export function formatBlockquote(text: string): string {
  // Split by newlines and add > to each line
  return text
    .split("\n")
    .map((line) => `> ${line}`)
    .join("\n");
}

/**
 * Formats a table in a message
 * @param headers Array of table headers
 * @param rows Array of arrays representing table rows
 * @returns Formatted table with markdown syntax
 */
export function formatTable(headers: string[], rows: string[][]): string {
  const headerRow = `| ${headers.join(" | ")} |`;
  const separatorRow = `| ${headers.map(() => "---").join(" | ")} |`;
  const dataRows = rows.map((row) => `| ${row.join(" | ")} |`);

  return [headerRow, separatorRow, ...dataRows].join("\n");
}
