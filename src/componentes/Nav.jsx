function Nav() {
  return (
    <nav className="bg-gray-900 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="text-2xl font-bold">
          🌟 Tu Bienestar
        </div>
        <ul className="flex space-x-6 text-lg font-medium">
          <li>
            <a href="/sobre-nosotros" className="hover:text-gray-400 transition">
              Conócenos
            </a>
          </li>
          <li>
            <a href="/contacto" className="hover:text-gray-400 transition">
              Contáctanos
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
