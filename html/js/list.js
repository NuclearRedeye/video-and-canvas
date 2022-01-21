function List(id, class_name)
{
    this.id = id;
    this.class_name = class_name;

    this.focus_index = 0;
    this.children = new Array();

    this.update = function()
    {
        var self = document.getElementById(this.id);
        var self_style = window.getComputedStyle(self, null);
        var self_x = self.offsetLeft - parseInt(self.getBoundingClientRect().left);
        var self_w = parseInt(self_style.getPropertyValue('width'));

        for (var i = 0; i < this.children.length; i++)
        {
            var item = document.getElementById(this.children[i].id);
            var item_style = window.getComputedStyle(item, null);
            var item_x = parseInt(item.offsetLeft);
            var item_w = parseInt(item_style.getPropertyValue('width'));
            var item_m = parseInt(item_style.getPropertyValue('margin-right'));
            if ((item_x + item_w + item_m) >= self_x && item_x <= (self_x + self_w))
            {
                this.children[i].update();
            }
        }
    }
    
    this.setFocus = function(is_focused)
    {
        this.children[this.focus_index].setFocus(is_focused);
    }

    this.setFocusItem = function(target_index)
    {
        if (target_index >= 0 && target_index < this.children.length)
        {
            var self = document.getElementById(this.id);
            var self_style = window.getComputedStyle(self, null);
            var self_x = self.offsetLeft - parseInt(self.getBoundingClientRect().left);
            var self_w = parseInt(self_style.getPropertyValue('width'));
            var item = document.getElementById(this.children[target_index].id);
            var item_style = window.getComputedStyle(item, null);
            var item_x = parseInt(item.offsetLeft);
            var item_w = parseInt(item_style.getPropertyValue('width'));
            var item_m = parseInt(item_style.getPropertyValue('margin-right'));

            if(item_x <= self_x)
            {
                var scroll_to = self_x - (self_x - item_x);
                self.style.webkitTransform = 'translate3d(' + -(scroll_to) + 'px, ' + 0 + 'px, 0)';
            }
            else if ((item_x + item_w) >= (self_x + self_w))
            {
               var scroll_to = self_x + ((item_x + item_w) - (self_x + self_w));
               self.style.webkitTransform = 'translate3d(' + -(scroll_to) + 'px, ' + 0 + 'px, 0)';
            }

            this.children[this.focus_index].setFocus(false);
            this.focus_index = target_index;
            this.children[this.focus_index].setFocus(true);
        }
    }

    this.populateChildren = function(fragment)
    {
        var rows = 4;
        var columns = 5;
        for (var row = 0; row < rows; row++)
        {
            for (var column = 0; column < columns; column++)
            {
                var ox = column * 256;
                var oy = row * 180; 
                var number = (row * columns) + column;
                var tmp_child = new ListItem(this.id + "-list-item-" + this.children.length, "preview-item", ox, oy, "Chapter " + (number + 1), number * 30);
                tmp_child.generateHTML(fragment);
                this.children[this.children.length] = tmp_child;
            }
        }
    }

    this.onKeyDown = function(key_code)
    {
        var ret_val = (this.children.length > 0) ? this.children[this.focus_index].onKeyDown(key_code) : false;
        if (ret_val == false)
        {
            ret_val = true;
            switch(key_code)
            {
                case 37: //Left Arrow
                    this.setFocusItem(this.focus_index - 1);
                    break;

                case 39: //Right Arrow
                    this.setFocusItem(this.focus_index + 1);
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
            this.populateChildren(tmp_self);
            fragment.appendChild(tmp_self);
        }
    }
}
