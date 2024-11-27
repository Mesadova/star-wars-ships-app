import { describe, expect, test } from "vitest";
import { screen } from "@testing-library/react";
import SingularStarship from "./SingularStarship";
import { renderWithProviders } from "../utils/test-utils";
import { setupStore } from "../store/store";
import { setStarshipToShow } from "../store/starshipsSlice";
import { act } from "react";

describe("SingularStarship", () => {

  test('Before dispatching the Starship to render the component is loading', () => {
    const store = setupStore()
    renderWithProviders(<SingularStarship />, { store })
    expect(screen.getByText("Loading...")).toBeDefined();
    expect(screen.queryByText("CR90 corvette")).toBeNull();
  })

  test('Sets up initial state and checks that the component renders the information', () => {
    const starshipsToShow = {
      name: 'CR90 corvette',
      model: 'CR90 corvette',
      manufacturer: 'Corellian Engineering Corporation',
      cost_in_credits: '3500000',
      length: '150',
      max_atmosphering_speed: '950',
      crew: '30-165',
      passengers: '600',
      cargo_capacity: '3000000',
      consumables: '1 year',
      hyperdrive_rating: '2.0',
      MGLT: '60',
      starship_class: 'corvette',
      pilots: [],
      films: [
        'https://swapi.dev/api/films/1/',
        'https://swapi.dev/api/films/3/',
        'https://swapi.dev/api/films/6/'
      ],
      created: '2014-12-10T14:20:33.369000Z',
      url: 'https://swapi.dev/api/starships/2/'
    }
    const store = setupStore()
    renderWithProviders(<SingularStarship />, { store })
    act(() => {
      store.dispatch(setStarshipToShow(starshipsToShow))
    })
    
    expect(screen.findByText("CR90 corvette")).toBeDefined();
    expect(screen.queryByText("Loading...")).toBeNull();
    screen.debug()

  })
});


