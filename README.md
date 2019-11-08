<div align="center">
   <h1>Extend Panel Menu</h1>
   <br>
   <p>The panel menu GNOME Shell deserves</p>
</div>

## Installation

### From source using [`meson`](http://mesonbuild.com/)

Clone this repository or download the [latest release](https://github.com/paysonwallach/extend-panel-menu/releases/latest).

```sh
git clone https://github.com/paysonwallach/extend-panel-menu.git
```

Configure the build directory at the root of the project.

```sh
meson --prefix=$HOME/.local build
```

Install with `ninja`.

```sh
ninja -C build install
```

Restart GNOME shell.

-   **X11/Xorg:** <kbd>Alt</kbd> + <kbd>F2</kbd> + `restart` or `r`
-   **Wayland:** Log out and log back in

Enable the extension with [GNOME Tweaks](https://gitlab.gnome.org/GNOME/gnome-tweaks) or `gnome-extensions`.

```sh
gnome-extensions enable extend-panel-menu@julio641742
```

## Screenshots

<div align="center">
<br>
<a href="https://raw.githubusercontent.com/julio641742/extend-panel-menu/master/screenshots/panel-v8.png"><img src="https://raw.githubusercontent.com/julio641742/extend-panel-menu/master/screenshots/panel-v8.png"></a>
<br>
<br>
<p>Panel</p>
<br>
<a href="https://raw.githubusercontent.com/julio641742/extend-panel-menu/master/screenshots/user-v8.png"><img src="https://raw.githubusercontent.com/julio641742/extend-panel-menu/master/screenshots/user-v8.png"></a>
<br>
<br>
<p>User menu</p>
<br>
<a href="https://raw.githubusercontent.com/julio641742/extend-panel-menu/master/screenshots/calendar-v8.png"><img src="https://raw.githubusercontent.com/julio641742/extend-panel-menu/master/screenshots/calendar-v8.png"></a>
<br>
<br>
<p>Calendar menu</p>
<br>
<a href="https://raw.githubusercontent.com/julio641742/extend-panel-menu/master/screenshots/volume-v8.png"><img src="https://raw.githubusercontent.com/julio641742/extend-panel-menu/master/screenshots/volume-v8.png"></a>
<br>
<br>
<p>Volume menu</p>
<br>
<a href="https://raw.githubusercontent.com/julio641742/extend-panel-menu/master/screenshots/network-v8.png"><img src="https://raw.githubusercontent.com/julio641742/extend-panel-menu/master/screenshots/network-v8.png"></a>
<br>
<br>
<p>Network menu</p>
<br>
<a href="https://raw.githubusercontent.com/julio641742/extend-panel-menu/master/screenshots/power-v8.png"><img src="https://raw.githubusercontent.com/julio641742/extend-panel-menu/master/screenshots/power-v8.png"></a>
<br>
<br>
<p>Power menu</p>
<br>
<a href="https://raw.githubusercontent.com/julio641742/extend-panel-menu/master/screenshots/nightlight-v8.png"><img src="https://raw.githubusercontent.com/julio641742/extend-panel-menu/master/screenshots/nightlight-v8.png"></a>
<br>
<br>
<p>Night Light menu</p>
<a href="https://raw.githubusercontent.com/julio641742/extend-panel-menu/master/screenshots/settings-v8.png"><img src="https://raw.githubusercontent.com/julio641742/extend-panel-menu/master/screenshots/settings-v8.png"></a>
<br>
<br>
<p>Settings</p>
</div>

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## Code of Conduct

By participating in this project, you agree to abide by the terms of the [Code of Conduct](https://github.com/paysonwallach/extend-panel-menu/blob/master/CODE_OF_CONDUCT.md).

## License

[Extend Panel Menu](https://github.com/paysonwallach/extend-panel-menu) is licensed under the [GNU General Public License v3.0](https://github.com/paysonwallach/extend-panel-menu/blob/master/LICENSE).
