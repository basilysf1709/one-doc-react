import { type NextRequest } from "next/server";
import { Onedoc } from "@onedoc/client";
import { readFileSync } from "fs";
import { join } from "path";

const onedoc = new Onedoc(process.env.ONEDOC_API_KEY as string);

export async function POST(request: any) {
  const jsonData = await request.json();
  const htmlContent = jsonData.html;
  const { file, error } = await onedoc.render({
    html: htmlContent,
    test: false,
    assets: [
      {
        path: "./assets/util.css",
        content: readFileSync(join(process.cwd(), "/assets/util.css")).toString(),
      },
    ],
  });

  if (error) {
    throw error;
  }

  const pdfBuffer = Buffer.from(file);

  // Return the PDF
  return new Response(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
    },
  });
}
