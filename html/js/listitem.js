/*******************************************************************************
 * Copyright (C) 2014 Joel Summerfield - All Rights Reserved
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Authored by Joel Summerfield <joel@mneah.com>
 ******************************************************************************/
function ListItem(id, class_name, offset_x, offset_y, title, pos)
{
    this.id = id;
    this.class_name = class_name;
    this.ox = offset_x;
    this.oy = offset_y;  
    
    this.chapter_title = title;
    this.chapter_position = pos;

    this.update = function()
    {
        var context = document.getElementById(this.id + "-canvas").getContext("2d");
        if(context != undefined)
        {
            context.fillStyle = "black";
            context.fillRect(0, 0, 256, 180);
            context.drawImage(document.getElementById("copy-canvas"), this.ox, this.oy, 256, 180, 0, 0, 256, 180);
        }
    }

    this.onKeyDown = function(key_code)
    {
        switch(key_code)
        {
            case 13: // Enter Key
                console.log("setting position to " + this.chapter_position);
                var video = document.getElementById('video-primary')
                video.currentTime = this.chapter_position;
                video.play();
                break;

            default:
                ret_val = false;
        }
        return ret_val;
    }

    this.setFocus = function(is_focused)
    {
        var scale = (is_focused == true) ? 1.0 : 0.9;
        var angle = (is_focused == true) ? 0 : (Math.floor((Math.random()*10)+1) - 5);
        document.getElementById(this.id).style.webkitTransform = "scale( " + scale + ", "+ scale + ") rotate(" + angle + "deg)";
        document.getElementById(this.id).style.color = (is_focused == true) ? "#3399FF" : "gray";
    }

    this.generateHTML = function(fragment)
    {
        if (fragment != undefined)
        {
            var tmp_self = document.createElement('div');
            tmp_self.id = this.id;
            tmp_self.className = this.class_name;
            fragment.appendChild(tmp_self);
            
            var tmp_title = document.createElement('div');
            tmp_title.id = this.id + "-title";
            tmp_title.className = this.class_name + "-title";
            tmp_title.innerHTML = this.chapter_title;

            var tmp_canvas = document.createElement('canvas');
            tmp_canvas.id = this.id + "-canvas";
            tmp_canvas.width = 256;
            tmp_canvas.height = 180;

            tmp_self.appendChild(tmp_canvas);
            tmp_self.appendChild(tmp_title);
            fragment.appendChild(tmp_self);
        }
    }
}
