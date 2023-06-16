import React from "react";
import "./CitySelection.css";
import { BsSearch } from "react-icons/bs";

export default function CitySelection() {
  return (
    <nav class="navbar navbar-expand-lg bg-light">
      <form class="d-flex" role="search">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button class="btn btn-outline-success" type="submit">
        <BsSearch/>
        </button>
      </form>
    </nav>
  );
}
