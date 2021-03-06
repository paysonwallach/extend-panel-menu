/*
 * This file is part of Extend Panel Menu
 *
 * Extend Panel Menu is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the
 * Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Extend Panel Menu is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Extend Panel Menu.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Copyright 2019 Payson Wallach
 * Copyright 2017-2018 Julio Galvan
 */

const { GObject, Shell, St } = imports.gi;
const Lang = imports.lang;
const PanelMenu = imports.ui.panelMenu;

var CustomButton = GObject.registerClass(
class Button extends PanelMenu.Button {
  _init(name) {
    super._init(0.0, name);
    this.name = name;
    this._center = false;
    this.box = new St.BoxLayout({
      vertical: false,
      style_class: "panel-status-menu-box"
    });
    this.actor.add_child(this.box);
  }

  _openApp(app) {
    Shell.AppSystem.get_default()
      .lookup_app(app)
      .activate();
  }

  set_spacing(spacing) {
    this._default_spacing = spacing;
    this.update_spacing(spacing);
  }

  update_spacing(spacing) {
    let style = "-natural-hpadding: %dpx".format(spacing);
    if (spacing < 6) {
      style += "; -minimum-hpadding: %dpx".format(spacing);
    }
    this.actor.set_style(style);
  }

  calculate_spacing() {
    let style = this.actor.get_style();
    if (style) {
      let start = style.indexOf("-natural-hpadding: ");
      let end = style.indexOf("px;");
      let val = parseInt(style.substring(start + 19, end));
      return val;
    }
    return NaN;
  }
});
