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

const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;

const ExtensionUtils = imports.misc.extensionUtils;

/**
 * registerResources:
 * @bundleID: (optional): the gresource bundle id
 *
 * Loads and registers a gresource bundle for @bundleID. If @bundleID is not
 * provided, it is taken from metadata["settings-schema"].
 */
function registerResources(bundleID) {
  let extension = ExtensionUtils.getCurrentExtension();

  bundleID = bundleID || extension.metadata["settings-schema"];

  Gio.Resource.load(
    GLib.build_filenamev([extension.dir.get_path(), bundleID + ".gresource"])
  )._register();
}
