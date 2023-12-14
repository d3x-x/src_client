import hud from 'basic/hud';
import gangZones from 'factions/gang/zones';

const player = mp.players.local;

class Auth {
	constructor() {
		mp.events.subscribe({
			'Auth-ShowMenu': this.showMenu,
			'Auth-SuccessLogin': this.onLogin,
			'Auth-SuccessRegister': this.onRegister.bind(this)
		});
	}

	private showMenu() {
		mp.browsers.showPage('auth', { email: mp.storage.data.login });
		gangZones.load();
	}

	private onLogin(email: string) {
		mp.storage.update({ login: email });
		setInterval(() => mp.discord.update('',''), 10000);
		mp.gui.chat.push(`Ласкаво просимо, ${player.name}`);
		hud.updateOnline();
		hud.setPlayerId();

		if (player.getVariable('isNewbie')) {
			return mp.events.callServer('Character-ShowCreator');
		}
		mp.browsers.showPage('daily');
		player.freezePosition(false);
	}
	private onRegister(email: string) {
		mp.storage.update({ login: email });
	}
}

const auth = new Auth();
