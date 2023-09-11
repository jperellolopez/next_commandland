// home page route (localhost:3000/). Server side as default. Put 'use client' at the top to change it to client side.
import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Descubre y comparte &nbsp;
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">
          Los mejores comandos para IA
        </span>
      </h1>
      <p className="desc text-center">
        CommandLand es una herramienta open-source de generación de comandos
        que te permitirá descubrir, crear y compartir comandos útiles y creativos para usar en cualquier servicio basado en IA
      </p>

      <Feed />
    </section>
  );
};

export default Home;
