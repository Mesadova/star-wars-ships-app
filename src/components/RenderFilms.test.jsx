import { describe, expect, test } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../utils/test-utils";
import { setupStore } from "../store/store";
import { setFilmsNames, setFilmsNumbers, setStarshipToShow } from "../store/starshipsSlice";
import { act } from "react";
import { RenderFilms } from "./RenderFilms";

describe("RenderFilms", () => {

  test('Sets up initial state and checks that the component renders the films', () => {
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
    const test_film = {
      title: 'Return of the Jedi',
      episode_id: 6
    }

    const store = setupStore()
    act(() => {
      store.dispatch(setStarshipToShow(starshipsToShow))
      store.dispatch(setFilmsNames(test_film))
      store.dispatch(setFilmsNumbers('3'))
    })
    renderWithProviders(<RenderFilms />, { store })

    expect(screen.getByText(/RETURN OF THE JEDI/i)).toBeInTheDocument();
    expect(screen.queryByText(/A NEW HOPE/i)).not.toBeInTheDocument();
  })
});


