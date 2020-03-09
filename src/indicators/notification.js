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

 * You should have received a copy of the GNU General Public License
 * along with Extend Panel Menu.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Copyright 2019 Payson Wallach
 * Copyright 2017-2018 Julio Galvan
 */

const { GObject, Gtk, St } = imports.gi;

const Extension = imports.misc.extensionUtils.getCurrentExtension();

const Main = imports.ui.main;

const Lang = imports.lang;

const Gettext = imports.gettext.domain("extend-panel-menu");
const _ = Gettext.gettext;

const CustomButton = Extension.imports.indicators.button.CustomButton;

var NotificationIndicator = GObject.registerClass(
class NotificationIndicator extends CustomButton {
  _init() {
    super._init("NotificationIndicator");

    this._messageList = Main.panel.statusArea.dateMenu._messageList;

    this._messageListParent = this._messageList.actor.get_parent();
    this._messageListParent.remove_actor(this._messageList.actor);

    this._indicator = new MessagesIndicator(
      Main.panel.statusArea.dateMenu._indicator._sources
    );

    this.box.add_child(this._indicator.actor);

    this._vbox = new St.BoxLayout({
      height: 400,
      style: "border:1px;"
    });

    this._vbox.add(this._messageList.actor);
    this.menu.box.add(this._vbox);

    try {
      this._messageList._removeSection(this._messageList._mediaSection);
    } catch (e) {}

    this.menu.connect("open-state-changed", (menu, isOpen) => {
      if (isOpen) {
        let now = new Date();
        this._messageList.setDate(now);
      }
    });

    this._closeButton = this._messageList._clearButton;
    this._hideIndicator = this._closeButton.connect("notify::visible", obj => {
      if (this._autoHide) {
        if (obj.visible) {
          this.actor.show();
        } else {
          this.actor.hide();
        }
      }
    });
  }

  setHide(value) {
    this._autoHide = value;
    if (!value) {
      this.actor.show();
    } else if (this._indicator._sources == "") {
      this.actor.hide();
    }
  }

  _onDestroy() {
    this._closeButton.disconnect(this._hideIndicator);
    this._vbox.remove_child(this._messageList.actor);
    this._messageListParent.add_actor(this._messageList.actor);
    this._onDestroy();
  }
});

var MessagesIndicator = class MessagesIndicator {
  constructor(src) {
    Gtk.IconTheme.get_default().add_resource_path(
      "resource:///org/gnome/shell/extensions/extend-panel-menu/icons/"
    );

    this._newNotifications = "notification-new-symbolic";
    this._noNotifications = "notifications-symbolic";
    this._sources = src;

    this.actor = new St.Icon({
      icon_name: this._noNotifications,
      style_class: "system-status-icon"
    });

    this._source_added = Main.messageTray.connect("source-added", (t, source) =>
      this._onSourceAdded(t, source)
    );
    this._source_removed = Main.messageTray.connect(
      "source-removed",
      (t, source) => {
        this._sources.splice(this._sources.indexOf(source), 1);
        this._updateCount();
      }
    );
    this._queue_changed = Main.messageTray.connect("queue-changed", () =>
      this._updateCount()
    );

    let sources = Main.messageTray.getSources();
    sources.forEach(source => {
      this._onSourceAdded(null, source);
    });
  }

  _onSourceAdded(tray, source) {
    source.connect("count-updated", () => this._updateCount());
    this._sources.push(source);
    this._updateCount();
  }

  _updateCount() {
    let count = 0;
    this._sources.forEach(source => {
      //count += source.unseenCount;
      count += source.count;
    });
    //count -= Main.messageTray.queueCount;

    this.actor.icon_name =
      count > 0 ? this._newNotifications : this._noNotifications;
  }

  destroy() {
    Main.messageTray.disconnect(this._source_added);
    Main.messageTray.disconnect(this._source_removed);
    Main.messageTray.disconnect(this._queue_changed);
  }
};
