const locisSWR = [
"BGBW", "BGSF", "BGTL", 
			"BIAR", "BIEG", "BIKF", 
			"BKPR",
			"CYBG", "CYEG", "CYFB", "CYHZ", "CYJT", "CYMX", "CYOW", "CYQB", "CYQM", "CYQX", 
			"CYQY", "CYUL", "CYVO", "CYVP", "CYVR", "CYWG", "CYXE", "CYXY", "CYYC", "CYYQ",
			"CYYR", "CYYT", "CYYZ", "CYZF", "CYZV",
			"DAAG", "DAAT", "DABC", "DAUG", "DAUI", "DAUZ", 
			"DBBB", 
			"DFFD", 
			"DGAA",
			"DIAP",
			"DNAA", "DNKN", "DNMM",
			"DRRN",
			"DTMB", "DTNH", "DTTA", "DTTJ", "DTTX", "DTTZ",
			"DXXX",
			"EBAW", "EBBR", "EBCI", "EBLG", "EBOS",
			"EDDB", "EDDC", "EDDE", "EDDF", "EDDG", "EDDH", "EDDK", "EDDL", "EDDM", "EDDN",
			"EDDP", "EDDR", "EDDS", "EDDT", "EDDV", "EDDW", "EDFH", "EDHI", "EDLP", "EDLW",
			"EDNY", "EDSB", "EDXW", 
			"EETN",
			"EFHK", "EFKT", "EFRO", "EFTP", "EFTU",
			"EGAA", "EGBB", "EGCC", "EGFF", "EGGP", "EGGW", "EGHH", "EGHI", "EGJJ", "EGKK",
			"EGLC", "EGLF", "EGLL", "EGMC", "EGNM", "EGNT", "EGNX", "EGPD", "EGPE", "EGPF",
			"EGPH", "EGPK", "EGPO", "EGSS", "EGTE", 
			"EHAM", "EHBK", "EHEH", "EHRD", 
			"EICK", "EICM", "EIDW", "EIKN", "EINN", 
			"EKAH", "EKBI", "EKCH", "EKYT",
			"ELLX",
			"ENBR", "ENGM", "ENTC", "ENTO", "ENVA", "ENZV", 
			"EPGD", "EPKK", "EPKT", "EPPO", "EPWA", "EPWR",
			"ESGG", "ESGJ", "ESGP", "ESKN", "ESMS", "ESNQ", "ESNU", "ESNZ", "ESOK", "ESOW",
			"ESPA", "ESSA", "ESSB", "ESSP", 
			"ETNL",
			"EVRA",
			"EYVI",
			"FABL", "FACT", "FALE", "FAOR", "FAUP",
			"FBSK",
			"FCBB",
			"FEFF",
			"FGSL",
			"FKKD", "FKYS",
			"FLKK",
			"FNLU",
			"FOOL", "FOON",
			"FQMA",
			"FSIA",
			"FTTJ",
			"FVJN", "FVRG",
			"FWCL", "FWKI",
			"FYWH",
			"FZAA", "FZQA",
			"GABS", "GAGO",
			"GBYD",
			"GCFV", "GCLA", "GCLP", "GCRR", "GCTS", "GCXO", 
			"GFLL",
			"GGOV",
			"GMAD", "GMFF", "GMME", "GMMH", "GMML", "GMMN", "GMTT",
			"GQNN", "GQPP",
			"GUCY",
			"GVAC",
			"HAAB", "HBBA", 
			"HEAX", "HEBA", "HEBL", "HECA", "HEGN", "HELX", "HEMA", "HESH", "HESN", "HETB",
			"HHAS",
			"HKJK", "HKMO",
			"HLKF", "HLLB", "HLLS", "HLLT",
			"HRYR",
			"HSOB", "HSSS",
			"HTDA", "HTKJ", "HTZA",
			"HUEN",
			"KABQ", "KATL", 
			"KBDL", "KBGR", "KBIL", "KBOI", "KBOS", "KBWI",
			"KCAE", "KCHS", "KCLE", "KCLT", "KCOS", "KCPR", "KCVG",
			"KDEN", "KDLH",
			"KEWR",
			"KFLL",
			"KGEG", "KGSO", "KGTF",
			"KIAD", "KIAG", "KIND",
			"KJAX", "KJFK",
			"KLAS", "KLAX", "KLGB", "KLSV", 
			"KMCI", "KMCO", "KMEM", "KMIA", "KMKE", "KMSP",
			"KOAK", "KOKC", "KONT", "KORD", "KORF",
			"KPBI", "KPDX", "KPHL", "KPHX", "KPIT", "KPWM",
			"KRDU", "KRFD", "KRNO", "KRSW",
			"KSAN", "KSCK", "KSEA", "KSFB", "KSFO", "KSLC", "KSMF", "KSTL", "KSWF", "KSYR",
			"KTPA", "KTYS",
			"LATI",
			"LBBG", "LBPD", "LBSF", "LBWN",
			"LCLK", "LCPH", "LCRA",
			"LDDU", "LDOS", "LDPL", "LDSP", "LDZA", "LDZD", 
			"LEAL", "LEAM", "LEAS", "LEBB", "LEBL", "LEGE", "LEGR", "LEGT", "LEIB", "LEJR",
			"LEMD", "LEMG", "LEMH", "LEPA", "LERS", "LEST", "LETO", "LEVC", "LEVT", "LEVX",
			"LEZG", "LEZL", 
			"LFBD", "LFBO", "LFBP", "LFBT", "LFBZ", "LFJL", "LFKB", "LFKC", "LFKF", "LFKJ",
			"LFLL", "LFLX", "LFML", "LFMN", "LFMP", "LFMT", "LFOB", "LFOK", "LFPG", "LFPO",
			"LFQQ", "LFRB", "LFRD", "LFRS", "LFSB", "LFSD", "LFSG", "LFSR", "LFST", "LFTW",
			"LGAD", "LGAV", "LGBL", "LGEL", "LGIO", "LGIR", "LGKF", "LGKL", "LGKO", "LGKR",
			"LGKV", "LGLM", "LGMK", "LGPZ", "LGRP", "LGRX", "LGSA", "LGSK", "LGSM", "LGSR",
			"LGTS", "LGZA",
			"LHBP", "LHSM", 
			"LIBD", "LIBP", "LIBR", "LICA", "LICC", "LICJ", "LICT", "LIEA", "LIEE", "LIEO",
			"LIMC", "LIME", "LIMF", "LIMJ", "LIML", "LIMZ", "LIPE", "LIPH", "LIPQ", "LIPR",
			"LIPX", "LIPY", "LIPZ", "LIRA", "LIRF", "LIRN", "LIRP", "LIRQ", "LIRZ", 
			"LJLJ", "LJMB",
			"LKMT", "LKPR", "LKTB",
			"LLBG", "LLOV", 
			"LMML",
			"LOWG", "LOWK", "LOWL", "LOWS", "LOWW",
			"LPAZ", "LPFR", "LPLA", "LPMA", "LPPD", "LPPR", "LPPS", "LPPT", 
			"LQSA", "LRBS", "LRCK", "LROP", "LRTR",
			"LSGG", "LSGS", "LSZA", "LSZB", "LSZH", "LSZR", 
			"LTAC", "LTAF", "LTAI", "LTBA", "LTBJ", "LTBS", "LTCC", "LTCE", "LTCG", "LTFE",
			"LTFJ", "LTFM", 
			"LUKK",
			"LWOH", "LWSK",
			"LYBE", "LYNI",
			"LZIB", "LZKZ","LZTT",
			"MBPV",
			"MDLR", "MDPC", "MDPP", "MDSD",
			"MKJP", "MKJS",
			"MMCZ", "MMMD", "MMUN",
			"MTPP",
			"MUCA", "MUCU", "MUHA", "MUHG", "MUVR",
			"MYGF", "MYNN",
			"OAKB", 
			"OBBI",
			"OEDF","OEJN", "OEMA","OERK",
			"OIIE", "OIII", "OIKB", "OIMM", "OISS", "OITR", "OITT", "OIZH",
			"OJAI", "OJAM", "OJAQ",
			"OKBK",
			"OLBA",
			"OMAA", "OMAL", "OMDB", "OMSJ",
			"OOMS",
			"OPKC", "OPLA", "OPNH", "OPRN", 
			"ORBI",
			"OSAP", "OSDI",
			"RCKH", "RCTP",
			"RJAA", "RJBB", "RJCC", "RJCH", "RJFF", "RJFK", "RJGG", "RJOO", "RJSM", "RJSN",
			"RJSS", "RJTT", "RJTY", 
			"RKPC", "RKPK", "RKSI", "RKSS", "RKTN", 
			"ROAH",
			"RPLL",
			"SBBR", "SBCF", "SBCT", "SBFN", "SBFZ", "SBGL", "SBGR", "SBKP", "SBNT", "SBPA",
			"SBRF", "SBSG", "SBSJ", "SBSV", 
			"TAPA",
			"TFFF", "TFFR",
			"TJSJ",
			"TTPP",
			"TXKF",
			"UAAA", "UACC", "UACK", "UATT", 
			"UBBB", "UBBG",
			"UCFM",
			"UDYZ",
			"UEEE", "UELL", "UERR",
			"UGTB",
			"UHHH", "UHPP", "UHSS",
			"UIAA", "UIBB", "UIII", "UIUU",
			"UKBB", "UKFF", "UKHH", "UKLL", "UKLR", "UKOO",
			"ULAA", "ULLI", "ULMM", 
			"UMMS",
			"UNAA", "UNKL", "UNNT",
			"UOOO",
			"URFF", "URKA", "URMM", "URSS",
			"USRR", "USSS",
			"UTAA", "UTDD", "UTSS", "UTTT",
			"UUDD", "UUEE", "UUWW", "UUYY",
			"UWGG", "UWKD", "UWUU", "UWWW",
			"VAAH", "VABB", "VANP",
			"VCBI",
			"VECC",
			"VGHS",
			"VHHH",
			"VIAR", "VIDP",
			"VMMC",
			"VOBG", "VOCI", "VOHS", "VOHY", "VOMM", "VOTV",
			"VRMM",
			"VTBD", "VTBS", "VTBU", "VTCC", "VTSP", "VTSS",
			"VVDN", "VVNB", "VVTS", "VYYY",
			"WIHH", "WIII", "WIMM",
			"WMKJ", "WMKK", "WMKP", "WMSA",
			"WSAP", "WSSS",
			"ZBAA", "ZBHH", "ZBTJ", "ZBYN", 
			"ZGGG", "ZGSZ",
			"ZHCC", "ZHHH",
			"ZLLL", "ZLXY",
			"ZMUB",
			"ZPPP",
			"ZSHC", "ZSNJ", "ZSPD", "ZSSS",
			"ZUUU",
			"ZWWW",
			"ZYTL"
]