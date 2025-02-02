import { useEffect, useState } from "react";

function Footer() {
  const [copyright, setCopyright] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/copyright")
      .then((res) => res.json())
      .then((data) => setCopyright(data.message))
      .catch((err) => console.error("Error fetching copyright:", err));
  }, []);

  return <footer className=" card-footer">{copyright}</footer>;
}

export default Footer;
