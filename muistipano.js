function capitalize(text) {
	return text[0].toUpperCase() + text.substring(1);
}

function nestedlist(content, level) {
	var i = document.createElement('li');
	var l = document.createElement('ul');
	var t = document.createElement('span');

	t.innerHTML = capitalize(content.nimi);
	i.appendChild(t);
	i.appendChild(l);

	i.className = 'sairaus-nestedlist';
	t.className = 'sairaus-nestedlist-title';

	content.kuvaus.forEach(function(e) {
		if (typeof e === 'string') {
			var item = document.createElement('li');
			item.innerHTML = capitalize(e);
			l.appendChild(item);
		} else if (typeof e === 'object') {
			l.appendChild(nestedlist(e, level + 1));
		}
	});

	return i;
}

function subsection(content, level) {
	var ss = document.createElement('section');
	var l = document.createElement('ul');
	var h = document.createElement('h' + ((level === undefined) ? 3 : level));

	h.innerHTML = capitalize(content.nimi);
	ss.appendChild(h);
	ss.appendChild(l);

	ss.className = 'sairaus-subsection';

	content.kuvaus.forEach(function(e) {
		if (typeof e === 'string') {
			var item = document.createElement('li');
			item.innerHTML = capitalize(e);
			l.appendChild(item);
		} else if (typeof e === 'object') {
			l.appendChild(nestedlist(e, level + 1));
		}
	});

	return ss;
}

function section(content, level) {
	var s = document.createElement('section');
	var h = document.createElement('h' + ((level === undefined) ? 2 : level));

	h.innerHTML = capitalize(content.nimi);
	s.appendChild(h);

	s.className = 'sairaus-section';

	content.kuvaus.forEach(function(e) {
		s.appendChild(subsection(e, ((level === undefined) ? 2 : level) + 1));
	});

	return s;
}

function append(content) {
	$('article').append(section(content));
}