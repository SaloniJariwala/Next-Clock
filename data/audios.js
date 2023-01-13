import alert from "../Assets/audios/alert.mp3";
import chipTunes from "../Assets/audios/chiptune.mp3";
import clockSound from "../Assets/audios/clcokSound.mp3";
import clockStrikes from "../Assets/audios/clcokStrikes.mp3";
import clockChime from "../Assets/audios/clockChime.mp3";
import creepyClock from "../Assets/audios/creepyClock.mp3";
import overSimplified from "../Assets/audios/oversimplified.mp3";
import superMario from "../Assets/audios/superMario.mp3";
import defaultAlarm from "../Assets/audios/alarm.mp3";

export const audioData = [
    {
        audioId: '1',
        english: 'Alarm',
        hindi: 'अलार्म',
        french: "Alarme",
        chinese: "警报",
        japanese: '警報',
        spanish: 'Alarma',
        track: defaultAlarm
    },
    {
        audioId: '2',
        english: "Alert",
        hindi: 'चेतावनी',
        french: "Alerte",
        chinese: "警戒",
        japanese: 'アラート',
        spanish: 'Alerta',
        track: alert
    },
    {
        audioId: '3',
        english: "Chiptune",
        hindi: 'चिपट्यून',
        french: "Chiptune",
        chinese: "芯片调谐器",
        japanese: 'チップチューン',
        spanish: 'melodía de chip',
        track: chipTunes
    },
    {
        audioId: '4',
        english: "Clock Sound",
        hindi: 'घड़ी की आवाज',
        french: "Son de l'horloge",
        chinese: "时钟声音",
        japanese: 'クロックサウンド',
        spanish: 'Sonido del reloj',
        track: clockSound
    },
    {
        audioId: '5',
        english: "Clock Strikes",
        hindi: 'घड़ी बजना',
        french: "Coups d'horloge",
        chinese: "钟声敲响",
        japanese: 'クロックストライク',
        spanish: 'Huelgas de reloj',
        track: clockStrikes
    },
    {
        audioId: '6',
        english: "Clock Chime",
        hindi: 'घड़ी की झंकार',
        french: "Carillon d'horloge",
        chinese: "钟声",
        japanese: '時計のチャイム',
        spanish: 'campana de reloj',
        track: clockChime
    },
    {
        audioId: '7',
        english: "Creepy Clock",
        hindi: 'खौफनाक घड़ी',
        french: "Horloge effrayante",
        chinese: "令人毛骨悚然的时钟",
        japanese: '不気味な時計',
        spanish: 'Reloj espeluznante',
        track: creepyClock
    },
    {
        audioId: '8',
        english: "Over Simplified",
        hindi: 'अति सरलीकृत',
        french: "Trop simplifié",
        chinese: "过度简化",
        japanese: '単純化しすぎ',
        spanish: 'demasiado simplificado',
        track: overSimplified
    },
    {
        audioId: '9',
        english: "Super Mario",
        hindi: 'सुपर मारियो',
        french: "Super Mario",
        chinese: "超级马里奥",
        japanese: 'スーパーマリオ',
        spanish: 'Super Mario',
        track: superMario
    }
];