import React from "react";
import { LoveMasta } from "../../components/LoveMasta";

export default function About(): JSX.Element {
  return (
    <div>
      <h2>Omnidex</h2>
      <h3>
        Made with ❤️ by Cidwel and Wulfara
        <br />
        filled with D E T E R M I N A T I O N
        <br />
        for learning and pursuing a better life purposes
        <br />
        using only Linux and Open Source software
      </h3>
      <ul>
        <li>❤️ Open Source</li>
        <li>❤️ Linux</li>
        <li>❤️ Git but not u, Microsoft (thanks for hosting, tho...)</li>
        <li>
          ❤️ <a href="https://pokeapi.co/">PokeAPI</a>
        </li>
        <li>
          ❤️ <a href="https://en.wikipedia.org/wiki/Web_standards">Open Web</a>
        </li>
        <li>❤️ Node, JavaScript, HTML, CSS & React</li>
        <li>❤️ All the standards which give power and control to people</li>
        <li>
          <LoveMasta />
        </li>
      </ul>
    </div>
  );
}
