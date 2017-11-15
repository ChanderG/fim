FFPATH=~/.mozilla/firefox/fz2ctcwm.default/

# open new tab based on history - freq
function fim-history-search {
  url=$(sqlite3 -separator '  ^  ' $FFPATH/places.sqlite "select url, title from moz_places order by frecency DESC;" | dmenu -l 10 -i -p "history>" | awk  '{print $1}' )
  if [ "$url" != "" ];then
    firefox -new-tab $url
  fi
}

# open new tab based on search
function fim-search {
  url=$(sqlite3 $FFPATH/places.sqlite "select url from moz_places WHERE url LIKE 'https://duckduckgo.com%' ORDER BY frecency DESC;" | awk -F'?q=' '{print $2}' | awk -F'&t' '{print $1}' | tr + ' ' | dmenu -l 10 -i -p "search>" | tr ' ' + )
  if [ "$url" != "" ];then
    firefox -new-tab "https://duckduckgo.com/?q=$url"
  fi 
}

# Not too reliable.
#cat sessionstore.js | jq '.windows | .[] | .tabs | .[] | .entries | .[] | .url,.title '
#cat sessionstore.js | jq '.windows | .[] | ._closedTabs | .[] | .state | .entries | .[] | .url,.title'
