/*******************************************************************************
 * Copyright (C) 2014 Joel Summerfield - All Rights Reserved
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Authored by Joel Summerfield <joel@mneah.com>
 ******************************************************************************/
function PreviewBar(id, class_name)
{
    this.id = id;
    this.class_name = class_name;

    this.focus_index = 0;
    this.children = new Array();

    this.update = function()
    {
        for (var i = 0; i < this.children.length; i++)
        {
            this.children[i].update();
        }
    }

    this.show = function()
    {
        // Get the current playback position, and set the correct chapter!
        var event = new Event('show');
        document.getElementById(this.id).dispatchEvent(event);
        document.getElementById(this.id).style.webkitTransform = "translate3d(0, 0px, 0)";
    }

    this.hide = function()
    {
        // Get the current playback position, and set the correct chapter!
        // Start the capture loop
        var event = new Event('hide');
        document.getElementById(this.id).dispatchEvent(event);
        document.getElementById(this.id).style.webkitTransform = "translate3d(0, 260px, 0)";
    }

    this.setFocus = function(is_focused)
    {
        this.children[this.focus_index].setFocus(is_focused);
    }

    this.onKeyDown = function(key_code)
    {
        var ret_val = (this.children.length > 0) ? this.children[this.focus_index].onKeyDown(key_code) : false;
        if (ret_val == false)
        {
            ret_val = true;
            switch(key_code)
            {
                case 38: // Up Arrow
                    console.log("Up");
                    this.show();
                    break;

                case 40: // Down Arrow
                    console.log("Down");
                    this.hide();
                    break;

                default:
                    ret_val = false;
            }
        }
        return ret_val;
    }

    this.generateHTML = function(fragment)
    {
        if (fragment != undefined)
        {
            var tmp_self = document.createElement('div');
            tmp_self.id = this.id;
            tmp_self.className = this.class_name;

            var tmp_list_child = new List(this.id + "-list", "preview-list");
            tmp_list_child.generateHTML(tmp_self);
            this.children[this.children.length] = tmp_list_child;

            fragment.appendChild(tmp_self);
        }
    }
}
