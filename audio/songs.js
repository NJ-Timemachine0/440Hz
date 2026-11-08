/* Optional local audio configuration. Never use commercial recordings.
 * Only approved recordings are configured (CC0 / PD / attribution licenses).
 * sections: permitted audible anomaly windows, seconds from file start.
 * part: melody | bass | timpani | snare | triangle. Pitch never targets snare/triangle;
 * noise/filter/stereo target melody only. RMS must exceed 0.012.
 * null means use the built-in synthesizer. Works offline over local HTTP.
 */
window.AUDIO_SONGS = {
  "songs": {
    "bolero": null,
    "swan_lake": null,
    "spring": {
      "file": "spring.mp3",
      "sections": [
        {
          "start": 0.25,
          "end": 5.75,
          "part": "melody"
        }
      ],
      "source": "https://commons.wikimedia.org/wiki/File:The_Modena_Chamber_Orchestra_-_Vivaldi%27s_Spring,_RV_269_-_I._Allegro.ogg",
      "credit": "The Modena Chamber Orchestra (via Musopen)",
      "license": "Public Domain Mark (PDMark-owner)",
      "originalFile": "03_vivaldi_spring_modena.ogg",
      "excerpt": [
        0.4,
        6.4
      ],
      "loudnessTargetLUFS": -20,
      "tuningNote": "Source is -20 cents. Reference and test both use this same decoded buffer; no pitch correction."
    },
    "jupiter": {
      "file": "jupiter.mp3",
      "sections": [
        {
          "start": 0.25,
          "end": 5.75,
          "part": "melody"
        }
      ],
      "source": "https://commons.wikimedia.org/wiki/File:Gustav_Holst_-_the_planets,_op._32_-_iv._jupiter,_the_bringer_of_jollity.ogg",
      "credit": "Skidmore College Orchestra (Musopen)",
      "license": "{{Attribution}} (free, attribution only)",
      "originalFile": "extra/A_holst_jupiter_skidmore_musopen.ogg",
      "excerpt": [
        184,
        190
      ],
      "loudnessTargetLUFS": -20,
      "attribution": "Performed by Skidmore College Orchestra, courtesy of Musopen (musopen.org)"
    },
    "anitra": {
      "file": "anitra.mp3",
      "sections": [
        {
          "start": 0.25,
          "end": 5.75,
          "part": "melody"
        }
      ],
      "source": "https://commons.wikimedia.org/wiki/File:Grieg,_Peer_Gynt_Suite_No._1,_Op._46_-_III._Anitra%27s_Dance.ogg",
      "credit": "Musopen Symphony Orchestra",
      "license": "CC0",
      "originalFile": "05_grieg_anitra_musopen.ogg",
      "excerpt": [
        3,
        9
      ],
      "loudnessTargetLUFS": -20
    },
    "gymnopedie": {
      "file": "gymnopedie.mp3",
      "sections": [
        {
          "start": 0.25,
          "end": 5.75,
          "part": "melody"
        }
      ],
      "source": "https://commons.wikimedia.org/wiki/File:Gymnopedie_No._1..ogg",
      "credit": "Teknopazzo (Commons user)",
      "license": "CC0",
      "originalFile": "06_satie_gymnopedie1_teknopazzo.ogg",
      "excerpt": [
        8,
        14
      ],
      "loudnessTargetLUFS": -20
    },
    "canon": {
      "file": "canon.mp3",
      "sections": [
        {
          "start": 0.25,
          "end": 5.75,
          "part": "melody"
        }
      ],
      "source": "https://commons.wikimedia.org/wiki/File:Kevin_MacLeod_-_Canon_in_D_Major.ogg",
      "credit": "Kevin MacLeod",
      "license": "CC BY 3.0 — attribution: \"Canon in D Major\" Kevin MacLeod (incompetech.com), Licensed under Creative Commons: By Attribution 3.0 http://creativecommons.org/licenses/by/3.0/",
      "originalFile": "07_pachelbel_canon_macleod.ogg",
      "excerpt": [
        32,
        38
      ],
      "loudnessTargetLUFS": -20,
      "attribution": "\"Canon in D Major\" Kevin MacLeod (incompetech.com), Licensed under Creative Commons: By Attribution 3.0 http://creativecommons.org/licenses/by/3.0/"
    },
    "new_world": {
      "file": "new_world.mp3",
      "sections": [
        {
          "start": 0.25,
          "end": 5.75,
          "part": "melody"
        }
      ],
      "source": "https://commons.wikimedia.org/wiki/File:Antonin_Dvorak_-_symphony_no._9_in_e_minor_%27from_the_new_world%27,_op._95_-_ii._largo.ogg",
      "credit": "Musopen (performer per Musopen)",
      "license": "PD-author (Musopen)",
      "originalFile": "extra/A_dvorak_largo_musopen.ogg",
      "excerpt": [
        48,
        54
      ],
      "loudnessTargetLUFS": -20,
      "attribution": "Musopen"
    },
    "mars": {
      "file": "mars.mp3",
      "sections": [
        {
          "start": 0.25,
          "end": 5.75,
          "part": "melody"
        }
      ],
      "source": "https://commons.wikimedia.org/wiki/File:Holst,_The_Planets,_Op._32_-_I._Mars,_the_Bringer_of_War.ogg",
      "credit": "Skidmore College Orchestra (Musopen)",
      "license": "CC0",
      "originalFile": "extra/A_holst_mars_skidmore_cc0.ogg",
      "excerpt": [
        2,
        8
      ],
      "loudnessTargetLUFS": -20
    },
    "nocturne": {
      "file": "nocturne.mp3",
      "sections": [
        {
          "start": 0.25,
          "end": 5.75,
          "part": "melody"
        }
      ],
      "source": "https://commons.wikimedia.org/wiki/File:Chopin_Nocturne_No._2_in_E_Flat_Major,_Op._9.ogg",
      "credit": "Peter Johnston (via Musopen)",
      "license": "CC0",
      "originalFile": "10_chopin_nocturne_johnston.ogg",
      "excerpt": [
        2,
        8
      ],
      "loudnessTargetLUFS": -20
    },
    "double_violin": {
      "file": "double_violin.mp3",
      "sections": [
        {
          "start": 0.25,
          "end": 5.75,
          "part": "melody"
        }
      ],
      "source": "https://commons.wikimedia.org/wiki/File:Concerto_for_two_violins_Part_1_(1915_recording).mp3",
      "credit": "Fritz Kreisler & Efrem Zimbalist, 1915 (LoC National Jukebox)",
      "license": "PD (US pre-1923 recording; JP/EU >70y)",
      "originalFile": "11_bach_double_1915.mp3",
      "excerpt": [
        8,
        14
      ],
      "loudnessTargetLUFS": -20,
      "excludeAnomalies": [
        "GLITCH_NOISE"
      ],
      "exclusionReason": "1915 surface noise: conservative perceptual exclusion; remaining allowed probabilities renormalized proportionally."
    },
    "dies_irae": null,
    "morning": {
      "file": "morning.mp3",
      "sections": [
        {
          "start": 0.25,
          "end": 5.75,
          "part": "melody"
        }
      ],
      "source": "https://commons.wikimedia.org/wiki/File:Grieg_-_Peer_Gynt_Suite_No._1,_Op._46_-_I._Morning_Mood_(Musopen_Symphony).flac",
      "credit": "Musopen Symphony",
      "license": "PD-author (Musopen)",
      "originalFile": "extra/B_grieg_morning_musopen.flac",
      "excerpt": [
        0.4,
        6.4
      ],
      "loudnessTargetLUFS": -20,
      "attribution": "Musopen"
    },
    "mountain_king": {
      "file": "mountain_king.mp3",
      "sections": [
        {
          "start": 0.25,
          "end": 5.75,
          "part": "melody"
        }
      ],
      "source": "https://commons.wikimedia.org/wiki/File:Grieg_-_Peer_Gynt_Suite_No._1,_Op._46_-_IV._In_the_Hall_of_the_Mountain_King_(Musopen_Symphony).flac",
      "credit": "Musopen Symphony",
      "license": "PD-author (Musopen)",
      "originalFile": "extra/B_grieg_mountainking_musopen.flac",
      "excerpt": [
        0.4,
        6.4
      ],
      "loudnessTargetLUFS": -20,
      "attribution": "Musopen"
    },
    "beethoven5": {
      "file": "beethoven5.mp3",
      "sections": [
        {
          "start": 0.25,
          "end": 5.75,
          "part": "melody"
        }
      ],
      "source": "https://commons.wikimedia.org/wiki/File:Ludwig_van_Beethoven_-_symphony_no._5_in_c_minor,_op._67_-_i._allegro_con_brio.ogg",
      "credit": "Musopen",
      "license": "{{Attribution}}",
      "originalFile": "extra/B_beethoven5_mvt1_musopen.ogg",
      "excerpt": [
        0.2,
        6.2
      ],
      "loudnessTargetLUFS": -20,
      "attribution": "Recording courtesy of Musopen (musopen.org)"
    },
    "can_can": {
      "file": "can_can.mp3",
      "sections": [
        {
          "start": 0.25,
          "end": 5.75,
          "part": "melody"
        }
      ],
      "source": "https://commons.wikimedia.org/wiki/File:Offenbach_-_Orpheus_in_the_Underworld_-_Overture.ogg",
      "credit": "Musopen",
      "license": "CC0",
      "originalFile": "extra/B_offenbach_orpheus_overture_musopen.ogg",
      "excerpt": [
        458,
        464
      ],
      "loudnessTargetLUFS": -20
    },
    "toreador": {
      "file": "toreador.mp3",
      "sections": [
        {
          "start": 0.25,
          "end": 5.75,
          "part": "melody"
        }
      ],
      "source": "https://commons.wikimedia.org/wiki/File:Bizet_-_Carmen_-_Toreador_Song_(French,_Musopen).ogg",
      "credit": "Musopen",
      "license": "CC0",
      "originalFile": "extra/B_bizet_toreador_musopen.ogg",
      "excerpt": [
        32,
        38
      ],
      "loudnessTargetLUFS": -20,
      "excludeAnomalies": [
        "PITCH_DRIFT",
        "PITCH_JUMP"
      ],
      "exclusionReason": "Vocal/orchestral pitch proxy: stable 200ms spans median 112.6c / p90 182.4c. Natural movement can mask 20/100c; conservative pitch exclusions, remaining weights proportional."
    }
  },
  "placeholders": {
    "bolero": {
      "file": "test_bolero.mp3",
      "sections": [
        {
          "start": 1.28,
          "end": 1.85,
          "part": "melody"
        },
        {
          "start": 2.4,
          "end": 2.93,
          "part": "melody"
        }
      ],
      "source": "Self-made Web Audio synthesis; no commercial recording",
      "credit": "440Hz team synthesized placeholder",
      "license": "CC0-1.0 (self-made synthesis)",
      "placeholder": true
    }
  }
};
