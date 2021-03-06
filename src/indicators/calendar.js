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

const { Clutter, GLib, Gtk, GObject, St } = imports.gi;
const Lang = imports.lang;
const Main = imports.ui.main;
const Extension = imports.misc.extensionUtils.getCurrentExtension();
const CustomButton = Extension.imports.indicators.button.CustomButton;

var CalendarIndicator = GObject.registerClass(
class CalendarIndicator extends CustomButton {
  _init() {
    super._init("CalendarIndicator");

    this._clock = Main.panel.statusArea.dateMenu._clock;
    this._calendar = Main.panel.statusArea.dateMenu._calendar;
    this._date = Main.panel.statusArea.dateMenu._date;
    this._eventsSection = new imports.ui.calendar.EventsSection();
    this._clocksSection = Main.panel.statusArea.dateMenu._clocksItem;
    this._weatherSection = Main.panel.statusArea.dateMenu._weatherItem;
    this._clockIndicator = Main.panel.statusArea.dateMenu._clockDisplay;
    this._clockIndicatorFormat = new St.Label({
      visible: false,
      y_align: Clutter.ActorAlign.CENTER
    });

    this._indicatorParent = this._clockIndicator.get_parent();
    this._calendarParent = this._calendar.actor.get_parent();
    this._sectionParent = this._clocksSection.actor.get_parent();
    this._indicatorParent.remove_actor(this._clockIndicator);
    this._calendarParent.remove_child(this._calendar.actor);
    this._calendarParent.remove_child(this._date.actor);
    this._sectionParent.remove_child(this._clocksSection.actor);
    this._sectionParent.remove_child(this._weatherSection.actor);

    this.box.add_actor(this._clockIndicator);
    this.box.add_actor(this._clockIndicatorFormat);

    let boxLayout;
    let vbox;
    boxLayout = new imports.ui.dateMenu.CalendarColumnLayout(
      this._calendar.actor
    );
    vbox = new St.Widget({
      style_class: "datemenu-calendar-column",
      layout_manager: boxLayout
    });
    boxLayout.hookup_style(vbox);
    let displaySection = new St.ScrollView({
      style_class: "datemenu-displays-section vfade",
      x_expand: true,
      x_fill: true,
      overlay_scrollbars: true
    });
    let dbox = new St.BoxLayout({
      vertical: true,
      style_class: "datemenu-displays-box"
    });
    displaySection.set_policy(Gtk.PolicyType.NEVER, Gtk.PolicyType.AUTOMATIC);

    vbox.add_actor(this._date.actor);
    vbox.add_actor(this._calendar.actor);
    dbox.add(this._eventsSection.actor, {
      x_fill: true
    });
    dbox.add(this._clocksSection.actor, {
      x_fill: true
    });
    dbox.add(this._weatherSection.actor, {
      x_fill: true
    });

    displaySection.add_actor(dbox);
    vbox.add_actor(displaySection);
    this.menu.box.add(vbox);

    this.menu.connect("open-state-changed", (menu, isOpen) => {
      if (isOpen) {
        let now = new Date();
        this._calendar.setDate(now);
        this._eventsSection.setDate(now);
        this._date.setDate(now);
      }
    });
    this._date_changed = this._calendar.connect(
      "selected-date-changed",
      (calendar, date) => {
        this._eventsSection.setDate(date);
      }
    );
  }

  override(format) {
    this.resetFormat();
    if (format == "") {
      return;
    }
    let that = this;
    this._formatChanged = GLib.timeout_add_seconds(
      GLib.PRIORITY_DEFAULT,
      1,
      () => {
        that.changeFormat();
        return true;
      }
    );
    this._clockIndicator.hide();
    this._clockIndicatorFormat.show();
    this._dateFormat = format;
    this.changeFormat();
  }

  changeFormat() {
    if (this._dateFormat && this._dateFormat != "") {
      let date = new Date();
      this._clockIndicatorFormat.set_text(
        date.toLocaleFormat(this._dateFormat)
      );
    }
  }

  resetFormat() {
    if (this._formatChanged) {
      GLib.source_remove(this._formatChanged);
      this._formatChanged = null;
    }
    this._clockIndicator.show();
    this._clockIndicatorFormat.hide();
  }

  _onDestroy() {
    this.resetFormat();
    this._calendar.disconnect(this._date_changed);
    this.box.remove_child(this._clockIndicator);
    this._calendar.actor.get_parent().remove_child(this._calendar.actor);
    this._date.actor.get_parent().remove_child(this._date.actor);
    this._clocksSection.actor
      .get_parent()
      .remove_child(this._clocksSection.actor);
    this._weatherSection.actor
      .get_parent()
      .remove_child(this._weatherSection.actor);

    this._indicatorParent.add_actor(this._clockIndicator);
    this._calendarParent.add_child(this._calendar.actor);
    this._calendarParent.add_child(this._date.actor);
    this._sectionParent.add_child(this._clocksSection.actor);
    this._sectionParent.add_child(this._weatherSection.actor);

    super._onDestroy();
  }
});
