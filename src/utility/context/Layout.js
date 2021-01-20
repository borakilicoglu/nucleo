import React from "react";
import themeConfig from "../../configs/themeConfig";
import layouts from "../../layout/layouts";

const ContextLayout = React.createContext();

class Layout extends React.Component {
  state = {
    activeLayout: themeConfig.layout,
    activeTheme: "light",
    width: window.innerWidth,
    lastLayout: null,
    direction: themeConfig.direction,
  };

  updateWidth = () => {
    this.setState({
      width: window.innerWidth,
    });
  };

  // handleWindowResize = () => {
  //   this.updateWidth();
  //   if (this.state.activeLayout === "horizontal" && this.state.width <= 1199) {
  //     this.setState({
  //       activeLayout: "vertical",
  //       lastLayout: "horizontal",
  //     });
  //   }

  //   if (this.state.lastLayout === "horizontal" && this.state.width >= 1199) {
  //     this.setState({
  //       activeLayout: "horizontal",
  //       lastLayout: "vertical",
  //     });
  //   }
  // };

  componentDidMount = () => {
    document.body.classList.add(`layout-${this.state.activeLayout}`);
    // if (window !== "undefined") {
    //   window.addEventListener("resize", this.handleWindowResize);
    // }
    this.handleDirUpdate();
    // if (this.state.activeLayout === "horizontal" && this.state.width <= 1199) {
    //   this.setState({
    //     activeLayout: "vertical",
    //   });
    // } else if (
    //   themeConfig.layout === "horizontal" &&
    //   this.state.width >= 1200
    // ) {
    //   this.setState({
    //     activeLayout: "horizontal",
    //   });
    // } else {
    //   this.setState({
    //     activeLayout: "vertical",
    //   });
    // }
  };

  componentDidUpdate(prevProps, prevState) {
    // this.handleDirUpdate();
    document.body.classList.remove(`layout-${prevState.activeLayout}`);
    document.body.classList.add(`layout-${this.state.activeLayout}`);
  }

  handleDirUpdate = () => {
    let dir = this.state.direction;
    if (dir === "rtl")
      document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
    else document.getElementsByTagName("html")[0].setAttribute("dir", "ltr");
  };

  render() {
    const { children } = this.props;
    return (
      <ContextLayout.Provider
        value={{
          state: this.state,
          layouts: layouts,
          switchLayout: (layout) => {
            this.setState({ activeLayout: layout });
          },
          switchTheme: (theme) => {
            this.setState({ activeTheme: theme });
          },
          switchDir: (dir) => {
            this.setState({ direction: dir });
          },
        }}
      >
        {children}
      </ContextLayout.Provider>
    );
  }
}

export { Layout, ContextLayout };
