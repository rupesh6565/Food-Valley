import os
import pytz

##############################
# Config
##############################

STATUS = (
    ('active', 'Active'),
    ('inactive', 'Inactive'),
    ('deleted', 'Deleted'),
)
STATUS_DICT = dict(STATUS)

CATEGORIES = (
    ('All', 'All'),
    ('Main Dishes', 'Main Dishes'),
    ('Kids Menus', 'Kids Menus'),
    ('Hot Baguette', 'Hot Baguette'),
    ('Burger Bar', 'Burger Bar'),
)
CATEGORIES_DICT = dict(CATEGORIES)
