
import Card from '#/components/modules/learn/Card'
import Button from '#/components/modules/learn/Button'

interface CourseCardProps {
    course: {
        id: number;
        title: string;
        description: string;
        banner: string;
        studentCount: number;
        cohortCount: number;
        status: 'active' | 'draft' | 'completed';
    };
    userRole: 'teacher' | 'student';
    onView: (id: number) => void;
    onEdit?: (id: number) => void;
    onDelete?: (id: number) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, userRole, onView, onEdit, onDelete }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'draft': return 'bg-yellow-100 text-yellow-800';
            case 'completed': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <Card hover className="overflow-hidden">
            <div className="relative">
                <img
                    src={course.banner}
                    alt={course.title}
                    className="w-full h-48 object-cover object-top"
                />
                <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                        {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                    </span>
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

                <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                    <div className="flex items-center">
                        <i className="ri-user-line mr-1"></i>
                        <span>{course.studentCount} students</span>
                    </div>
                    <div className="flex items-center">
                        <i className="ri-group-line mr-1"></i>
                        <span>{course.cohortCount} cohorts</span>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Button
                        onClick={() => onView(course.id)}
                        variant="primary"
                        size="sm"
                        className="flex-1"
                    >
                        {userRole === 'teacher' ? 'Manage' : 'Open'}
                    </Button>

                    {userRole === 'teacher' && (
                        <>
                            <Button
                                onClick={() => onEdit?.(course.id)}
                                variant="ghost"
                                size="sm"
                            >
                                <i className="ri-edit-line"></i>
                            </Button>
                            <Button
                                onClick={() => onDelete?.(course.id)}
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                                <i className="ri-delete-bin-line"></i>
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </Card>
    );
}

export default CourseCard
