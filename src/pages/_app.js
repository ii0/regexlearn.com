import '../styles/globals.scss'
import '../styles/index.scss'

import { useState, useEffect } from 'react';
import { FormattedMessage, IntlProvider } from "react-intl";
import cx from "classnames";
import lookie from "lookie";
import dynamic from 'next/dynamic'

import { Provider as LanguageProvider } from "../contexts/LanguageContext";
import localization from "../localization";
import getOS from "../utils/useOS";

const DynamicAlert = dynamic(() => import("../components/Alert"), { ssr: false });

const defaultLang = "en-us";

function MyApp({ Component, pageProps }) {
  const [lang, setLang] = useState(defaultLang);
  const [isDesktop, setDesktop] = useState(defaultLang);

  const handleChangeLang = (newLang) => {
    lookie.set("lang", newLang);
    setLang(newLang);
  };

  useEffect(() => {
    setLang(lookie.get("lang") || "en-us");
    setDesktop(getOS().isDesktop);
  }, []);

  return (
    <IntlProvider
      messages={localization[lang]}
      locale={lang}
      defaultLocale={defaultLang}
    >
      <LanguageProvider lang={lang} setLang={handleChangeLang}>
        <div className={cx("App", { desktop: isDesktop })}>
          <DynamicAlert>
            <FormattedMessage id="alert.site.under.development" />
          </DynamicAlert>
          <Component {...pageProps} />
        </div>
      </LanguageProvider>
    </IntlProvider>
  )


}

export default MyApp