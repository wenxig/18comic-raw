import { combineReducers } from "redux";
import settingsReducer, { SettingsState } from "../reducers/settingsReducer";
import mainReducer, { MainState } from "../reducers/mainReducer";
import detailReducer, { DetailState } from "../reducers/detailReducer";
import forumReducer, { ForumState } from "../reducers/forumReducer";
import searchReducer, { SearchState } from "../reducers/searchReducer";
import weekReducer, { WeekState } from "../reducers/weekReducer";
import blogsReducer, { BlogsState } from "../reducers/blogsReducer";
import creatorReducer, { CreatorState } from "../reducers/creatorReducer";
import categoriesReducer, { CategoriesState } from "../reducers/categoriesReducer";
import memberReducer, { MemberState } from "../reducers/memberReducer";
import gamesReducer, { GamesState } from "../reducers/gamesReducer";
import moviesReducer, { moviesState } from "../reducers/moviesReducer";
import moviesPlayerReducer, { MoviesPlayerState } from "../reducers/moviesPlayerReducer";
import hotUpdateReducer, { hotUpdateState } from "../reducers/hotUpdateReducer";


const rootReducer = combineReducers({
  hotUpdate: hotUpdateReducer,
  settings: settingsReducer,
  main: mainReducer,
  detail: detailReducer,
  forum: forumReducer,
  search: searchReducer,
  week: weekReducer,
  blogs: blogsReducer,
  creator: creatorReducer,
  categories: categoriesReducer,
  member: memberReducer,
  games: gamesReducer,
  movies: moviesReducer,
  MoviesPlayer: moviesPlayerReducer,
});

export type RootState = {
  hotUpdate: hotUpdateState;
  settings: SettingsState;
  main: MainState;
  detail: DetailState;
  forum: ForumState;
  search: SearchState;
  week: WeekState;
  blogs: BlogsState;
  creator: CreatorState;
  categories: CategoriesState;
  member: MemberState;
  games: GamesState;
  movies: moviesState;
  MoviesPlayer: MoviesPlayerState;
};

export default rootReducer;
