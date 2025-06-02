// 프로젝트 데이터를 JSON 형식으로 정리
const projectsData = [
    {
        id: "modern-villa",
        title: "Modern Villa",
        category: "residential",
        year: "2023",
        description: "A contemporary residence designed for a family of four, featuring open living spaces and a seamless indoor-outdoor connection.",
        thumbnail: "images/portfolio/exam.jpg",
        location: "Jeju Island, South Korea",
        area: "350 m²",
        client: "Private Family",
        fullDescription: [
            "This modern villa was designed to harmonize with the natural surroundings of Jeju Island while providing luxurious living spaces. The design embraces the concept of indoor-outdoor living [1], with expansive glass walls that frame the spectacular ocean views and allow abundant natural light to optimize circadian rhythms [4].",
            "The layout was carefully planned to create both intimate family spaces and generous areas for entertaining. The use of local volcanic stone pays homage to the island's distinctive geology [2], while contemporary materials ensure durability in the coastal environment. Climate-responsive design principles were applied to address the subtropical coastal conditions [5].",
            "Sustainability was a key consideration, with passive solar design principles, rainwater harvesting systems, and energy-efficient fixtures integrated throughout [3]. The landscaping showcases native plants that require minimal maintenance and water, creating a seamless transition between the built environment and the natural landscape."
        ],
        gallery: [
            {
                imageDay: "images/portfolio/exam.jpg",
                imageNight: "images/portfolio/exam_night.jpg",
                caption: "Modern Villa - Exterior View",
                isMain: true
            },
            {
                imageDay: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
                imageNight: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
                caption: "Open Concept Living Room",
                isMain: false
            },
            {
                imageDay: "https://images.unsplash.com/photo-1617104424032-cb15208e2e0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
                imageNight: "https://images.unsplash.com/photo-1617104424032-cb15208e2e0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
                caption: "Modern Kitchen with Island",
                isMain: false
            },
            {
                imageDay: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
                imageNight: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
                caption: "Oceanfront View",
                isMain: false
            },
            {
                imageDay: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
                imageNight: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
                caption: "Infinity Pool with Ocean View",
                isMain: false
            }
        ],
        materials: [
            {
                name: "Volcanic Stone",
                description: "Used for exterior walls and features",
                color: "#696969",
                usageImages: [
                    {
                        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=85",
                        caption: "Exterior Wall Application",
                        location: "Front Facade",
                        description: "Creates dramatic contrast against modern glass elements"
                    },
                    {
                        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=85",
                        caption: "Interior Feature Wall",
                        location: "Living Room",
                        description: "Adds natural texture and warmth to the interior space"
                    }
                ]
            },
            {
                name: "White Oak",
                description: "Flooring and custom cabinetry",
                color: "#D2B48C",
                usageImages: [
                    {
                        image: "https://images.unsplash.com/photo-1617104424032-cb15208e2e0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=85",
                        caption: "Kitchen Cabinetry",
                        location: "Kitchen",
                        description: "Custom oak cabinetry provides warmth and functionality"
                    },
                    {
                        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=85",
                        caption: "Living Room Flooring",
                        location: "Main Living Area",
                        description: "Natural oak flooring creates continuity throughout the space"
                    }
                ]
            },
            {
                name: "Polished Concrete",
                description: "Kitchen countertops and bathroom surfaces",
                color: "#F5F5F5",
                usageImages: [
                    {
                        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=85",
                        caption: "Kitchen Countertops",
                        location: "Kitchen",
                        description: "Sleek concrete countertops offer durability and modern aesthetic"
                    },
                    {
                        image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=85",
                        caption: "Bathroom Vanity",
                        location: "Master Bathroom",
                        description: "Polished concrete creates a spa-like atmosphere"
                    }
                ]
            },
            {
                name: "Brushed Aluminum",
                description: "Window frames and architectural details",
                color: "#C0C0C0",
                usageImages: [
                    {
                        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=85",
                        caption: "Window Frames",
                        location: "Exterior",
                        description: "Brushed aluminum frames complement the modern design"
                    },
                    {
                        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=85",
                        caption: "Interior Details",
                        location: "Various Interior",
                        description: "Subtle aluminum accents add contemporary sophistication"
                    }
                ]
            }
        ],
        references: [
            {
                title: "Biophilic Design and Human Well-being in Coastal Architecture",
                authors: "Alexander, R., Chen, M., Park, S.",
                journal: "Journal of Environmental Psychology",
                year: "2023",
                url: "https://doi.org/10.1016/j.jenvp.2023.xxx",
                type: "spatial-psychology",
                note: "이 연구의 자연 요소 통합 원리를 현대 빌라의 실내외 연결 설계에 적용하여 거주자의 심리적 안정감과 자연과의 연결감을 향상시켰습니다. 특히 제주도의 해안 환경을 고려한 설계 접근법에 활용되었습니다."
            },
            {
                title: "Volcanic Stone in Contemporary Architecture: Material Properties and Applications",
                authors: "Kim, J.H., Lee, D.S.",
                journal: "Materials & Design",
                year: "2022",
                url: "https://doi.org/10.1016/j.matdes.2022.xxx",
                type: "material-science",
                note: "제주도 화산석의 물리적 특성과 건축적 활용에 대한 연구 결과를 바탕으로 외벽 마감재 선정 및 시공 방법을 결정했습니다. 내구성과 심미성을 동시에 만족하는 마감 기법을 적용했습니다."
            },
            {
                title: "Sustainable Design Strategies for Island Residential Architecture",
                authors: "Thompson, A., Yamamoto, K.",
                journal: "Building and Environment",
                year: "2023",
                url: "https://doi.org/10.1016/j.buildenv.2023.xxx",
                type: "sustainability",
                note: "도서 지역의 지속 가능한 건축 설계 전략을 참고하여 우수 재활용 시스템, 태양광 패널 설치, 자연 환기 시스템 등을 통합 설계했습니다. 에너지 효율성을 극대화하면서도 거주 편의성을 확보했습니다."
            },
            {
                title: "Natural Light and Human Circadian Rhythms in Residential Design",
                authors: "Martinez, L., Nakamura, H., Wilson, P.",
                journal: "Architectural Science Review",
                year: "2024",
                url: "https://doi.org/10.1080/00038628.2024.xxx",
                type: "lighting-design",
                note: "자연광이 인간의 생체리듬에 미치는 영향을 연구한 결과를 바탕으로 창호 계획과 실내 조명 설계를 최적화했습니다. 거주자의 수면 패턴과 생산성 향상을 위한 조명 전략을 적용했습니다."
            },
            {
                title: "Climate-Responsive Architecture in Subtropical Coastal Environments",
                authors: "Lee, S.M., Garcia, R., Tanaka, K.",
                journal: "Energy and Buildings",
                year: "2023",
                url: "https://doi.org/10.1016/j.enbuild.2023.xxx",
                type: "climate-design",
                note: "아열대 해안 지역의 기후 특성을 고려한 건축 설계 방법론을 적용하여 자연 통풍과 열 성능을 최적화했습니다. 제주도의 계절별 기후 변화에 대응하는 건축적 해결책을 제안했습니다."
            }
        ]
    },
    {
        id: "urban-office-space",
        title: "Urban Office Space",
        category: "commercial",
        year: "2022",
        description: "A dynamic workspace designed for a tech startup, balancing collaborative areas with private spaces for focused work.",
        thumbnail: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
        location: "Gangnam, Seoul",
        area: "380 m²",
        client: "TechStart Inc.",
        fullDescription: [
            "This urban office space was designed for a growing tech startup that needed a balance of collaborative and private work areas. The open-plan design promotes communication and idea sharing, while dedicated quiet zones provide spaces for focused work.",
            "The industrial aesthetic utilizes exposed concrete, steel, and glass, softened by natural wood elements and strategic greenery. A central social hub with kitchen facilities serves as a gathering place for team lunches and informal meetings.",
            "Custom modular furniture allows the team to reconfigure the space as needed for different activities, from team meetings to client presentations. Smart technology is integrated throughout, controlling lighting, climate, and audio-visual systems for a seamless user experience."
        ],
        gallery: [
            {
                imageDay: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=70",
                imageNight: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=70",
                caption: "Urban Office Space - Central Area",
                isMain: true
            },
            {
                imageDay: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
                imageNight: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
                caption: "Collaborative Workspace",
                isMain: false
            },
            {
                imageDay: "https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
                imageNight: "https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
                caption: "Meeting Room",
                isMain: false
            },
            {
                imageDay: "https://images.unsplash.com/photo-1572025442646-866d16c84a54?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
                imageNight: "https://images.unsplash.com/photo-1572025442646-866d16c84a54?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
                caption: "Private Work Pods",
                isMain: false
            },
            {
                imageDay: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
                imageNight: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
                caption: "Lounge Area",
                isMain: false
            }
        ],
        materials: [
            {
                name: "Polished Concrete",
                description: "Flooring and select wall treatments",
                color: "#A9A9A9"
            },
            {
                name: "White Oak",
                description: "Custom workstations and shelving",
                color: "#D2B48C"
            },
            {
                name: "Glass Partitions",
                description: "Meeting rooms and breakout spaces",
                color: "#F5F5F5"
            },
            {
                name: "Powder-coated Steel",
                description: "Structural elements and details",
                color: "#2F4F4F"
            }
        ]
    },
    {
        id: "modern-office-space",
        title: "Modern Office Space",
        category: "commercial",
        year: "2023",
        description: "A contemporary office design focused on transparency, collaboration, and flexibility for a growing tech company.",
        thumbnail: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        location: "Seoul, South Korea",
        area: "450 m²",
        client: "Tech Innovations Co.",
        fullDescription: [
            "This modern office space was designed to foster collaboration while maintaining privacy when needed. The concept revolves around the idea of transparency and openness, with glass partitions used throughout to divide spaces without blocking light or views.",
            "The color palette is intentionally neutral with strategic pops of the company's brand colors, creating a sense of identity without overwhelming the space. Natural materials like wood and stone are used to add warmth and texture to the otherwise minimalist design.",
            "Flexibility was a key consideration, with modular furniture and movable partitions allowing the space to be reconfigured as needed. Acoustic solutions were carefully integrated to manage sound in the open areas, ensuring that concentration and privacy are not compromised."
        ],
        gallery: [
            {
                imageDay: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=70",
                imageNight: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=70",
                caption: "Modern Office Main View",
                isMain: true
            },
            {
                imageDay: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
                imageNight: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
                caption: "Collaborative Meeting Area",
                isMain: false
            },
            {
                imageDay: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
                imageNight: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
                caption: "Focus Workstation Pods",
                isMain: false
            }
        ],
        materials: [
            {
                name: "Light Oak Flooring",
                description: "Used throughout the main office areas for a bright and airy feel.",
                color: "#E0C9A6"
            },
            {
                name: "Glass Partitions",
                description: "Separates office and meeting spaces while maintaining visual openness.",
                color: "#F0F8FF"
            },
            {
                name: "Acoustic Felt Panels",
                description: "Used on walls and ceilings to absorb sound and reduce noise.",
                color: "#808080"
            },
            {
                name: "Powder Coated Metal Accents",
                description: "For furniture legs, light fixtures, and trim details.",
                color: "#333333"
            }
        ]
    },
    {
        id: "cozy-cafe-interior",
        title: "Cozy Cafe Interior",
        category: "hospitality",
        year: "2022",
        description: "An inviting cafe space featuring warm lighting, natural textures, and comfortable seating arrangements.",
        thumbnail: "https://images.unsplash.com/photo-1559305403-1a0a8a954de8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        location: "Itaewon, Seoul",
        area: "120 m²",
        client: "The Daily Grind Cafe",
        fullDescription: [
            "The design for The Daily Grind Cafe aimed to create a warm, inviting atmosphere where customers can relax and enjoy their coffee. The space utilizes a palette of natural materials, including reclaimed wood, exposed brick, and soft textiles.",
            "Lighting plays a crucial role in setting the mood, with a mix of ambient, task, and accent lighting to create a cozy and layered effect. Comfortable seating options, from plush armchairs to communal tables, cater to different customer preferences.",
            "A custom-built counter serves as the focal point of the cafe, showcasing pastries and coffee-making equipment. The overall design balances rustic charm with modern simplicity, creating a timeless and welcoming space for the local community."
        ],
        gallery: [
            {
                imageDay: "https://images.unsplash.com/photo-1559305403-1a0a8a954de8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=70",
                imageNight: "https://images.unsplash.com/photo-1559305403-1a0a8a954de8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=70",
                caption: "Cozy Cafe - Main Seating Area",
                isMain: true
            },
            {
                imageDay: "https://images.unsplash.com/photo-1511920183303-a818f19050b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
                imageNight: "https://images.unsplash.com/photo-1511920183303-a818f19050b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
                caption: "Barista Counter and Display",
                isMain: false
            },
            {
                imageDay: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
                imageNight: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
                caption: "Window Seating Area",
                isMain: false
            },
            {
                imageDay: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
                imageNight: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
                caption: "Detail of Cafe Decor",
                isMain: false
            }
        ],
        materials: [
            {
                name: "Reclaimed Wood",
                description: "For feature walls and custom furniture",
                color: "#A0522D"
            },
            {
                name: "Exposed Brick",
                description: "Adds texture and warmth to the interior",
                color: "#B22222"
            },
            {
                name: "Polished Concrete Floors",
                description: "Durable and easy to maintain",
                color: "#808080"
            },
            {
                name: "Blackened Steel Accents",
                description: "For lighting fixtures and shelving supports",
                color: "#36454F"
            }
        ]
    }
]; 