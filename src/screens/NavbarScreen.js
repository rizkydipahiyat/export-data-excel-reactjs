import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const NavbarScreen = () => {
	return (
		<Navbar bg="dark" variant="dark">
			<Navbar.Brand className="container" href="#home">
				React Data Export
			</Navbar.Brand>
		</Navbar>
	);
};

export default NavbarScreen;
