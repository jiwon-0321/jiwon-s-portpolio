// 프로젝트 데이터를 JSON 형식으로 정리
const projectsData = [
    {
        id: "modern-villa",
        title: "Modern Villa",
        category: "residential",
        year: "2023",
        description: "A contemporary residence designed for a family of four, featuring open living spaces and a seamless indoor-outdoor connection.",
        thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
        location: "Jeju Island, South Korea",
        area: "350 m²",
        client: "Private Family",
        fullDescription: [
            "This modern villa was designed to harmonize with the natural surroundings of Jeju Island while providing luxurious living spaces. The design embraces the concept of indoor-outdoor living, with expansive glass walls that frame the spectacular ocean views and allow abundant natural light.",
            "The layout was carefully planned to create both intimate family spaces and generous areas for entertaining. The use of local volcanic stone pays homage to the island's distinctive geology, while contemporary materials ensure durability in the coastal environment.",
            "Sustainability was a key consideration, with passive solar design principles, rainwater harvesting systems, and energy-efficient fixtures integrated throughout. The landscaping showcases native plants that require minimal maintenance and water, creating a seamless transition between the built environment and the natural landscape."
        ],
        gallery: [
            {
                image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=70",
                caption: "Modern Villa - Exterior View",
                isMain: true
            },
            {
                image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
                caption: "Open Concept Living Room",
                isMain: false
            },
            {
                image: "https://images.unsplash.com/photo-1617104424032-cb15208e2e0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
                caption: "Modern Kitchen with Island",
                isMain: false
            },
            {
                image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
                caption: "Oceanfront View",
                isMain: false
            },
            {
                image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
                caption: "Infinity Pool with Ocean View",
                isMain: false
            }
        ],
        materials: [
            {
                name: "Volcanic Stone",
                description: "Used for exterior walls and features",
                color: "#696969"
            },
            {
                name: "White Oak",
                description: "Flooring and custom cabinetry",
                color: "#D2B48C"
            },
            {
                name: "Polished Concrete",
                description: "Kitchen countertops and bathroom surfaces",
                color: "#F5F5F5"
            },
            {
                name: "Brushed Aluminum",
                description: "Window frames and architectural details",
                color: "#C0C0C0"
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
                image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=70",
                caption: "Urban Office Space - Central Area",
                isMain: true
            },
            {
                image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
                caption: "Collaborative Workspace",
                isMain: false
            },
            {
                image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
                caption: "Meeting Room",
                isMain: false
            },
            {
                image: "https://images.unsplash.com/photo-1572025442646-866d16c84a54?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
                caption: "Private Work Pods",
                isMain: false
            },
            {
                image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
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
                image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=70",
                caption: "Main Office Area - Open Concept Design",
                isMain: true
            },
            {
                image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
                caption: "Glass-walled Meeting Room",
                isMain: false
            },
            {
                image: "https://images.unsplash.com/photo-1519974719765-e6559eac2575?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
                caption: "Collaborative Breakout Area",
                isMain: false
            },
            {
                image: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
                caption: "Executive Private Office",
                isMain: false
            },
            {
                image: "https://images.unsplash.com/photo-1600494448637-2b37b2d8df14?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=70",
                caption: "Modern Staff Kitchen",
                isMain: false
            }
        ],
        materials: [
            {
                name: "Polished Concrete",
                description: "Used for flooring in common areas",
                color: "#E0E0E0"
            },
            {
                name: "Walnut Wood",
                description: "Custom cabinetry and feature walls",
                color: "#8B5A2B"
            },
            {
                name: "Brushed Steel",
                description: "Architectural details and fixtures",
                color: "#A9A9A9"
            },
            {
                name: "Acoustic Panels",
                description: "Sound absorption on walls and ceilings",
                color: "#F5F5F5"
            }
        ]
    }
]; 