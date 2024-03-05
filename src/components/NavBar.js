import { Menu } from "@progress/kendo-react-layout";

export const NavBar = () => {
  return (
    <div>
      <Menu items={[{"text": "Movies"}, {"text": "Create movie(s)"}, {"text": "Logout"}, {"text": "Create account"}]}/>
    </div>
  );
}
