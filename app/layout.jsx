// main entry point of the app. All the components are wrapped within it. Provides a common layout for all the pages, so what is in here is displayed in all the application pages.

import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

// metadata (SEO)
export const metadata = {
  title: "CommandLand",
  description: "Descubre y comparte los comandos para AI más útiles",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="es">
      <body>
        <Provider> {/*Provider component imported for authentication functionalities */}
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            {/* we call the Nav component in the layout page because its meant to be a common element accross  all the sections of the app*/}
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
