import ReactQueryProvider from "../../providers/reactQueryProvider";
import Provider from "@/providers/reduxProvider";
import NavBar from "@/components/NavBar";
import { dir } from "i18next";
import { languages } from "@/i18n/settings";

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}) {
  return (
    <html lang={lang} dir={dir(lang)}>
      <body>
        <ReactQueryProvider>
          <Provider>
            <NavBar params={{ lang }} />
            {children}
          </Provider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
