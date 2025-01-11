{
    "architecture": {
        "classes": [
            {
                "comment": "класс1",
                "id": "1736268426716",
                "methods": [
                    {
                        "calls": [
                            {
                                "class": "класс1",
                                "method": "метод2"
                            }
                        ],
                        "comment": "метод1",
                        "id": "1736268439294",
                        "name": "метод1"
                    },
                    {
                        "calls": [],
                        "comment": "метод2",
                        "id": "1736268448511",
                        "name": "метод2"
                    }
                ],
                "name": "класс1",
                "pattern": "Singleton"
            },
            {
                "comment": "класс2",
                "id": "1736268504074",
                "methods": [
                    {
                        "calls": [
                            {
                                "class": "класс1",
                                "method": "метод2"
                            },
                            {
                                "class": "класс1",
                                "method": "метод1"
                            }
                        ],
                        "comment": "",
                        "id": "1736268514477",
                        "name": "метод1"
                    },
                    {
                        "calls": [],
                        "comment": "",
                        "id": "1736268522428",
                        "name": "метод2"
                    }
                ],
                "name": "класс2",
                "pattern": "Observer"
            }
        ]
    },
    "status": "success"
}